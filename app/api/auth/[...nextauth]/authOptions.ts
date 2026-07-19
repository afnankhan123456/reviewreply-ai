import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { resolveOwnerAndRole } from "@/lib/getEffectiveOwner";

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
          scope:
            "openid email profile https://www.googleapis.com/auth/business.manage",
          access_type: "offline",
          prompt: "consent",
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
      if (account?.access_token) token.accessToken = account.access_token;
      if (account?.provider) token.provider = account.provider;
      if (user?.email) token.isAdmin = user.email === adminEmail;
      if (user?.email) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email },
            select: { id: true, referralCode: true },
          });
          if (dbUser) {
            token.id = dbUser.id;
            token.referralCode = dbUser.referralCode;
          }
        } catch (err) {
          console.log("Error fetching referral code for JWT:", err);
        }
      }

      // Team role/owner ko HAR request pe fresh check karo (sirf login ke waqt nahi),
      // taaki invite accept hote hi turant sahi access mile, dobara login na karna pade.
      if (token?.id) {
        try {
          const { ownerId, role } = await resolveOwnerAndRole(token.id);
          token.ownerId = ownerId;
          token.teamRole = role;
        } catch (err) {
          console.log("Error resolving team role for JWT:", err);
        }
      }

      // Google Business token DB me save karo (cron jobs ko baad me chahiye honge)
      if (account?.access_token && token?.id) {
        try {
          const updateData: any = {
            googleAccessToken: account.access_token,
            googleConnected: true,
          };
          if (account.refresh_token) {
            updateData.googleRefreshToken = account.refresh_token;
          }
          await prisma.user.update({
            where: { id: token.id },
            data: updateData,
          });
        } catch (err) {
          console.log("Error saving Google tokens:", err);
        }
      }

      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.isAdmin = token.isAdmin;
      session.referralCode = token.referralCode;
      if (session.user) {
        session.user.id = token.id;
        session.user.ownerId = token.ownerId || token.id;
        session.user.teamRole = token.teamRole || "OWNER";
      }
      return session;
    },
    async redirect({ baseUrl, url }: any) {
      // Team invite accept link ko wapas usi jagah bhejo (dashboard tak khud pahunch jayega)
      if (url.startsWith(`${baseUrl}/api/team/accept`) || url.includes("/api/team/accept")) {
        return url.startsWith(baseUrl) ? url : `${baseUrl}${url.startsWith("/") ? url : `/${url}`}`;
      }
      if (url.includes("admin=true")) return `${baseUrl}/admin`;
      return `${baseUrl}/plans`;
    },
  },
  pages: { signIn: "/login" },
};
