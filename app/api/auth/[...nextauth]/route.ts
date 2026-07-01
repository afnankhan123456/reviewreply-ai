import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
