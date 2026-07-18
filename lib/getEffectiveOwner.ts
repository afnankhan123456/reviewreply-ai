import { prisma } from "@/lib/prisma";

export type TeamRole = "OWNER" | "FULL_ACCESS" | "VIEW_ONLY";

/**
 * Ye helper decide karta hai ki login karne wale user ka
 * asli "business data owner" kaun hai.
 * - Agar khud Owner hai -> apna hi id return karega, role "OWNER"
 * - Agar kisi Owner ka accepted team member hai -> us Owner ka id
 *   return karega, role uska access level (FULL_ACCESS / VIEW_ONLY)
 */
export async function resolveOwnerAndRole(
  userId: string
): Promise<{ ownerId: string; role: TeamRole }> {
  try {
    const membership = await prisma.teamMember.findFirst({
      where: { memberUserId: userId, status: "ACCEPTED" },
      select: { ownerId: true, accessLevel: true },
    });

    if (membership) {
      return {
        ownerId: membership.ownerId,
        role: membership.accessLevel as TeamRole,
      };
    }

    return { ownerId: userId, role: "OWNER" };
  } catch (error) {
    console.error("Error resolving effective owner:", error);
    return { ownerId: userId, role: "OWNER" };
  }
}
