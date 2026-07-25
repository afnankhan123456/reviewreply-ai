import { prisma } from "@/lib/prisma";

/**
 * Agar user ke paas ek "pending" (renew karke rakha hua) plan hai aur
 * uska current plan ka time poora ho chuka hai, to pending plan ko
 * turant live plan bana do — bilkul agle din se, jaisa purane plan
 * ke khatam hone ke baad hona chahiye.
 *
 * Ye function safe hai baar-baar call karne ke liye (login pe, cron me,
 * plan-status API me) — agar activate karne ki zarurat nahi hai to
 * kuch nahi karega.
 */
export async function activatePendingPlanIfDue(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      pendingPlan: true,
      pendingPlanDays: true,
      pendingPlanActivatesAt: true,
    },
  });

  if (!user?.pendingPlan || !user.pendingPlanDays || !user.pendingPlanActivatesAt) {
    return null; // koi pending plan hai hi nahi
  }

  const now = new Date();
  if (now < new Date(user.pendingPlanActivatesAt)) {
    return null; // abhi time nahi aaya
  }

  // Purana plan ke poore din khatam ho chuke — ab naya plan start karo
  const start = new Date(user.pendingPlanActivatesAt); // wahi din jisse activate hona tha
  const end = new Date(start.getTime() + user.pendingPlanDays * 24 * 60 * 60 * 1000);

  const tier = user.pendingPlan.startsWith("standard") ? "standard" : "basic";
  const alertEmailsLimit = tier === "standard" ? 450 : 100;
  const criticalEmailsLimit = tier === "standard" ? 50 : 0;

  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      plan: user.pendingPlan,
      subscriptionStart: start,
      subscriptionEnd: end,
      reviewsUsed: 0,
      monthlyResetDate: start,
      alertEmailsLimit,
      criticalEmailsLimit,
      lastExpiryNotified: null, // naya cycle — expiry email dobara ban jaye 5 din pehle
      pendingPlan: null,
      pendingPlanDays: null,
      pendingPlanActivatesAt: null,
    },
  });

  return updated;
}
