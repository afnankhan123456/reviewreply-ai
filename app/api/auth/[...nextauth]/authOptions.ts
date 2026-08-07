import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import { cookies, headers } from "next/headers";
import { resolveOwnerAndRole } from "@/lib/getEffectiveOwner";
import { activatePendingPlanIfDue } from "@/lib/planQueue";

const adminEmail = process.env.ADMIN_EMAIL;

function generateReferralCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "REF-";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// 🔒 Best-effort client IP for referral-abuse detection.
// Not spoof-proof (headers can be faked), but enough to flag obvious
// same-IP repeat signups for manual review before any payout.
async function getClientIp(): Promise<string | null> {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    if (forwardedFor) return forwardedFor.split(",")[0].trim();
    return headersList.get("x-real-ip");
  } catch {
    return null;
  }
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

        // ✅ FIX: khud apne referral code se signup na kar sake (self-referral abuse)
        const isSelfReferral =
          referrer && referrer.email.toLowerCase() === user.email.toLowerCase();

        if (!existingUser) {
          const referralCode = generateReferralCode();

          // ✅ FIX (Bug #5): naya user create hote waqt error aaye to login
          // FAIL karna hai — warna login "success" dikh jayega par DB mein
          // user record banega hi nahi, jisse har API call "User not found"
          // dega. Isliye ye create call apne alag try/catch mein hai.
          try {
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
          } catch (createError) {
            console.error("SIGN IN ERROR (user create failed):", createError);
            return false;
          }

          if (referrerCodeFromCookie && !isSelfReferral) {
            const signupIp = await getClientIp();
            // ✅ FIX: pehle sirf "same IP se koi bhi signup" dekhta tha —
            // ab specifically "isi referrer ke against same IP se pehle bhi
            // signup hua hai" check karta hai, jo asli referral-farming
            // pattern ko zyada accurately pakadta hai.
            const priorSignupFromSameIp = signupIp
              ? await prisma.referralSignup.findFirst({
                  where: {
                    signupIp,
                    referrerEmail: referrer?.email || referrerCodeFromCookie,
                  },
                })
              : null;
            await prisma.referralSignup.create({
              data: {
                signupEmail: user.email,
                referrerEmail: referrer?.email || referrerCodeFromCookie,
                signupIp,
                flagged: Boolean(priorSignupFromSameIp),
              },
            });
            // ✅ FIX: flagged signups ka stats-counter (jo future payout ka
            // basis ban sakta hai) increment nahi hoga — sirf clean signups count honge.
            if (!priorSignupFromSameIp) {
              await trackReferralSignup(referrerCodeFromCookie);
            }
          }
        } else {
          const updateData: any = {
            lastLogin: new Date(),
          };
          if (!existingUser.referralCode) {
            updateData.referralCode = generateReferralCode();
          }
          await prisma.user.update({ where: { email: user.email }, data: updateData });
          if (referrerCodeFromCookie && !isSelfReferral) {
            const alreadyTracked = await prisma.referralSignup.findFirst({
              where: {
                signupEmail: user.email,
                referrerEmail: referrer?.email || referrerCodeFromCookie,
              },
            });
            if (!alreadyTracked) {
              const signupIp = await getClientIp();
              const priorSignupFromSameIp = signupIp
                ? await prisma.referralSignup.findFirst({
                    where: {
                      signupIp,
                      referrerEmail: referrer?.email || referrerCodeFromCookie,
                    },
                  })
                : null;
              await prisma.referralSignup.create({
                data: {
                  signupEmail: user.email,
                  referrerEmail: referrer?.email || referrerCodeFromCookie,
                  signupIp,
                  flagged: Boolean(priorSignupFromSameIp),
                },
              });
              if (!priorSignupFromSameIp) {
                await trackReferralSignup(referrerCodeFromCookie);
              }
            }
          }
        }
        return true;
      } catch (error) {
        // ✅ FIX (Bug #5): naye-user creation ka critical error upar hi
        // `return false` se handle ho chuka hai. Ye bahar wala catch sirf
        // non-critical cheezein (referral tracking, cookie read, etc.)
        // pakadta hai — existing (already-DB-mein-maujood) users ko isi
        // wajah se login se block nahi karna chahiye, isliye yahan `true`
        // hi rehne diya hai.
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
      // taaki invite accept hote hi (ya remove hote hi) turant sahi access mile.
      if (token?.id) {
        try {
          const { ownerId, role } = await resolveOwnerAndRole(token.id);
          token.ownerId = ownerId;
          token.teamRole = role;

          // Owner ka plan bhi fetch karo — taaki removed member Standard dashboard
          // me na ghus sake agar uska apna account Basic plan ka hai.
          const ownerRecord = await prisma.user.findUnique({
            where: { id: ownerId },
            select: { plan: true, subscriptionEnd: true },
          });
          token.plan = ownerRecord?.plan || "basic";
          token.subscriptionEnd = ownerRecord?.subscriptionEnd || null;

          // ✅ Agar queue me koi naya plan tha aur purane plan ke din poore ho chuke,
          // to login hote hi usko turant switch kar do.
          await activatePendingPlanIfDue(ownerId);
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
            googleTokenExpiresAt: account.expires_at
              ? new Date(account.expires_at * 1000)
              : new Date(Date.now() + 3600 * 1000),
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
      session.isAdmin = token.isAdmin;
      session.referralCode = token.referralCode;
      if (session.user) {
        session.user.id = token.id;
        session.user.ownerId = token.ownerId || token.id;
        session.user.teamRole = token.teamRole || "OWNER";
        session.user.plan = token.plan || "basic";
      }
      return session;
    },
    async redirect({ baseUrl, url }: any) {
      if (url.startsWith(`${baseUrl}/api/team/accept`) || url.includes("/api/team/accept")) {
        return url.startsWith(baseUrl) ? url : `${baseUrl}${url.startsWith("/") ? url : `/${url}`}`;
      }
      if (url.includes("admin=true")) return `${baseUrl}/admin`;
      return `${baseUrl}/plans`;
    },
  },
  pages: { signIn: "/login" },
};
