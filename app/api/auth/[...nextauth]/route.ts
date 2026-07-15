import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// ✅ YE LINE ADD KI HAI (Ab 'authOptions' export ho jayega)
export { authOptions };
