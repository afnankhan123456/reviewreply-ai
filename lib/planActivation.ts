import { prisma } from "@/lib/prisma";

const durations: Record<string, number> = {
  "1m": 30,
  "3m": 90,
  "6m": 180,
  "12m": 365,
  monthly: 30,
  quarterly: 90,
  halfyearly: 180,
  yearly: 360,
};

type Tier = "basic" | "standard";

/**
 * Plan ko activate karta hai — ya to turant, ya (agar purana plan abhi
 * chalu hai) queue me daal deta hai taaki purane plan ke khatam hone ke
 * agle din se automatically start ho jaye.
 *
 * ✅ FIX: Ab is function ko sirf un routes se hi call hona chahiye jinhone
 * pehle PayPal se orderID verify kar liya ho (status === "COMPLETED").
 * Koi bhi naya caller add karte waqt payment-verification zaroor add karo —
 * ye function khud koi payment check nahi karta.
 *
 * ✅ NAYA FIX (Payment Replay Protection): orderID ab yahan bhi liya jata hai
 * aur activation se PEHLE `UsedPaypalOrder` table mein unique-create try hota
 * hai. Agar wahi orderID pehle se exist karta hai, matlab ye payment already
 * use ho chuki hai — activation reject ho jayega, chahe PayPal khud us order
 * ko "COMPLETED" hi kyun na bataye (kyunki COMPLETED status hamesha wahi
 * rehta hai, ek hi orderID dobara bhi COMPLETED hi dikhega).
 */
export async function activateOrQueuePlan(
  email: string,
  planType: string,
  tier: Tier,
  orderID: string
) {
  if (!durations[planType]) {
    throw new Error("Invalid plan type");
  }

  if (!orderID) {
    throw new Error("Missing orderID");
  }

  // ✅ Replay check: is orderID ka pehle se koi record hai kya
  const alreadyUsed = await prisma.usedPaypalOrder.findUnique({
    where: { orderId: orderID },
  });

  if (alreadyUsed) {
    throw new Error("This payment has already been used to activate a plan.");
  }

  const combinedPlan = `${tier}-${planType}`;
  const alertEmailsLimit = tier === "standard" ? 450 : 100;
  const criticalEmailsLimit = tier === "standard" ? 50 : 0;
  const durationDays = durations[planType];

  const currentUser = await prisma.user.findUnique({
    where: { email },
    select: { gmailConnected: true, subscriptionEnd: true },
  });

  if (!currentUser) {
    throw new Error("User not found");
  }

  // ✅ orderID ko turant "used" mark kar do (activation se pehle) — taaki
  // agar isi orderID se do requests almost-same-time pe aayein (race
  // condition), to unique constraint hi doosri request ko fail kar de.
  await prisma.usedPaypalOrder.create({
    data: {
      orderId: orderID,
      userEmail: email,
      planType,
      tier,
    },
  });

  const oldPlanStillActive =
    currentUser.subscriptionEnd && new Date(currentUser.subscriptionEnd) > new Date();

  if (oldPlanStillActive) {
    const activatesAt = new Date(currentUser.subscriptionEnd as Date);
    activatesAt.setDate(activatesAt.getDate() + 1); // purana khatam hone ke agle din se

    await prisma.user.update({
      where: { email },
      data: {
        pendingPlan: combinedPlan,
        pendingPlanDays: durationDays,
        pendingPlanActivatesAt: activatesAt,
      },
    });

    return { queued: true, plan: combinedPlan, activatesAt };
  }

  const start = new Date();
  const end = new Date(start.getTime() + durationDays * 24 * 60 * 60 * 1000);

  await prisma.user.update({
    where: { email },
    data: {
      subscriptionStart: start,
      subscriptionEnd: end,
      plan: combinedPlan,
      reviewsUsed: 0,
      monthlyResetDate: start,
      lastExpiryNotified: null,
      pendingPlan: null,
      pendingPlanDays: null,
      pendingPlanActivatesAt: null,
      ...(currentUser.gmailConnected ? { alertEmailsLimit, criticalEmailsLimit } : {}),
    },
  });

  return { queued: false, plan: combinedPlan };
}
