import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

const adminEmail = process.env.ADMIN_EMAIL;

function generateReferralCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "REF-";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

async function trackReferralSignup(referrerCode: string) {
  try {
    if (!referrerCode) return;
    const referrer = await prisma.user.findUnique({
      where: { referralCode: referrerCode },
    });
    if (!referrer) return;
    const existingStats = await prisma.referralStats.findFirst({
      where: { userId: referrer.id },
    });
    if (existingStats) {
      await prisma.referralStats.update({
        where: { id: existingStats.id },
        data: { googleSignups: { increment: 1 }, updatedAt: new Date() },
      });
    } else {
      await prisma.referralStats.create({
        data: {
          userId: referrer.id,
          referralCode: referrerCode,
          referralClicks: 0,
          googleSignups: 1,
          paidSubscriptions: 0,
        },
      });
    }
  } catch (error) {
    console.error("Error tracking referral signup:", error);
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/business.manage",
        },
      },
    }),
  ],
  session: { strategy: "jwt" as const },
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies: true,
  trustHost: true,
  callbacks: {
    async signIn({ user }: any) {
      try {
        if (!user.email) return false;
        const existingUser = await prisma.user.findUnique({ where: { email: user.email } });
        const cookieStore = await cookies();
        const referrerCodeFromCookie = cookieStore.get("referrerCode")?.value || null;
        const referrer = referrerCodeFromCookie
          ? await prisma.user.findUnique({ where: { referralCode: referrerCodeFromCookie } })
          : null;

        if (!existingUser) {
          const referralCode = generateReferralCode();
          await prisma.user.create({
            data: {
              name: user.name || "",
              email: user.email,
              image: user.image || "",
              plan: "basic",
              subscriptionStatus: "active",
              reviewsUsed: 0,
              reviewsLimit: 100,
              locationsUsed: 0,
              locationsLimit: 1,
              googleConnected: false,
              googleBusinessConnected: false,
              createdAt: new Date(),
              lastLogin: new Date(),
              referralCode,
            },
          });
          if (referrerCodeFromCookie) {
            await prisma.referralSignup.create({
              data: {
                signupEmail: user.email,
                referrerEmail: referrer?.email || referrerCodeFromCookie,
              },
            });
            await trackReferralSignup(referrerCodeFromCookie);
          }
        } else {
          const updateData: any = {
            lastLogin: new Date(),
          };
          if (!existingUser.referralCode) {
            updateData.referralCode = generateReferralCode();
          }
          await prisma.user.update({ where: { email: user.email }, data: updateData });
          if (referrerCodeFromCookie) {
            const alreadyTracked = await prisma.referralSignup.findFirst({
              where: {
                signupEmail: user.email,
                referrerEmail: referrer?.email || referrerCodeFromCookie,
              },
            });
            if (!alreadyTracked) {
              await prisma.referralSignup.create({
                data: {
                  signupEmail: user.email,
                  referrerEmail: referrer?.email || referrerCodeFromCookie,
                },
              });
              await trackReferralSignup(referrerCodeFromCookie);
            }
          }
        }
        return true;
      } catch (error) {
        console.log("SIGN IN ERROR:", error);
        return true;
      }
    },
    async jwt({ token, account, user }: any) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
        if (user?.email) {
          try {
            await prisma.user.update({
              where: { email: user.email },
              data: {
                googleAccessToken: account.access_token,
                googleRefreshToken: account.refresh_token || null,
              },
            });
          } catch (err) {
            console.error("Error saving tokens:", err);
          }
        }
      }
      if (account?.provider) token.provider = account.provider;
      if (user?.email) token.isAdmin = user.email === adminEmail;
      if (user?.email) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email },
            select: { referralCode: true },
          });
          if (dbUser) token.referralCode = dbUser.referralCode;
        } catch (err) {
          console.log("Error fetching referral code for JWT:", err);
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.isAdmin = token.isAdmin;
      session.referralCode = token.referralCode;
      return session;
    },
    async redirect({ baseUrl, url }: any) {
      if (url.includes("admin=true")) return `${baseUrl}/admin`;
      return `${baseUrl}/plans/standard`;
    },
  },
  pages: { signIn: "/login" },
};
