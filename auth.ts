import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { prisma } from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
  },

  secret: process.env.AUTH_SECRET,
});