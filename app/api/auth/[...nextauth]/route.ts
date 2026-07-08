import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../../lib/prisma";
import { cookies } from "next/headers";

export const runtime = "nodejs";

const adminEmail = process.env.ADMIN_EMAIL;

// Helper function to generate unique referral code
function generateReferralCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "REF-";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

const handler = NextAuth({
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
          response_type: "code",
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user }) {
      try {
        if (!user.email) {
          return false;
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        // ✅ Server-safe cookie read
        const cookieStore = await cookies();
        const referralCodeFromCookie = cookieStore.get("referral_code")?.value || null;

        if (!existingUser) {
          // NEW USER: Generate unique referral code
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
              referralCode: referralCode,
            },
          });

          // ✅ ReferralSignup with correct referrerEmail
          await prisma.referralSignup.create({
            data: {
              signupEmail: user.email,
              referrerEmail: referralCodeFromCookie,
            },
          });
        } else {
          // EXISTING USER: Update lastLogin and generate code if missing
          const updateData: any = { lastLogin: new Date() };
          
          if (!existingUser.referralCode) {
            const newReferralCode = generateReferralCode();
            updateData.referralCode = newReferralCode;
          }

          await prisma.user.update({
            where: { email: user.email },
            data: updateData,
          });

          // ✅ Existing user: also track if cookie exists
          if (referralCodeFromCookie) {
            await prisma.referralSignup.create({
              data: {
                signupEmail: user.email,
                referrerEmail: referralCodeFromCookie,
              },
            });
          }
        }

        return true;
      } catch (error) {
        console.log("SIGN IN ERROR:", error);
        return true;
      }
    },

    async jwt({ token, account, user }) {
      if (account?.access_token) {
        (token as any).accessToken = account.access_token;
      }

      if (account?.provider) {
        (token as any).provider = account.provider;
      }

      if (user?.email) {
        (token as any).isAdmin = user.email === adminEmail;
      }

      if (user?.email) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email },
            select: { referralCode: true },
          });
          if (dbUser) {
            (token as any).referralCode = dbUser.referralCode;
          }
        } catch (err) {
          console.log("Error fetching referral code for JWT:", err);
        }
      }

      return token;
    },

    async session({ session, token }) {
      (session as any).accessToken = (token as any).accessToken;
      (session as any).isAdmin = (token as any).isAdmin;
      (session as any).referralCode = (token as any).referralCode;
      
      return session;
    },

    async redirect({ baseUrl, url }) {
      if (url.includes("admin=true")) {
        return `${baseUrl}/admin`;
      }
      return `${baseUrl}/plans`;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
