import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

export const runtime = "nodejs";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// ✅ YE LINE ADD KARO (Isse error fix ho jayega)
export { authOptions };
