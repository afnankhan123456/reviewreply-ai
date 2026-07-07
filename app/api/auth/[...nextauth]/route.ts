import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../../lib/prisma";

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
              referralCode: referralCode, // 👈 ADDED THIS
            },
          });
        } else {
          await prisma.user.update({
            where: { email: user.email },
            data: { lastLogin: new Date() },
          });
        }

        return true;
      } catch (error) {
        console.log("SIGN IN ERROR:", error);
        return true;
      }
    },

    async jwt({ token, account, user }) {
      // Store access token if available
      if (account?.access_token) {
        (token as any).accessToken = account.access_token;
      }

      // Store the provider in JWT
      if (account?.provider) {
        (token as any).provider = account.provider;
      }

      // Mark admin if email matches
      if (user?.email) {
        (token as any).isAdmin = user.email === adminEmail;
      }

      // 👇 Fetch and store referralCode from DB into JWT
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
      (session as any).referralCode = (token as any).referralCode; // 👈 ADDED THIS
      
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
