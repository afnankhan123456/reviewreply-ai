import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "../../../../../lib/prisma";

export const runtime = "nodejs";

const adminEmail = process.env.ADMIN_EMAIL;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  callbacks: {

    async signIn({ user }) {

      if (!user.email) {
        return false;
      }

      const existingUser = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (!existingUser) {

        await prisma.user.create({
          data: {
            name: user.name,
            email: user.email,
            image: user.image,
            plan: "basic",
          },
        });

      } else {

        await prisma.user.update({
          where: {
            email: user.email,
          },
          data: {
            lastLogin: new Date(),
          },
        });

      }

      return true;
    },

    async jwt({ token, user }) {

      if (user?.email) {
        token.isAdmin = user.email === adminEmail;
      }

      return token;
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
