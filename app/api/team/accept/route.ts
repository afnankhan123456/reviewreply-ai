import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const invite = await prisma.teamMember.findUnique({
    where: { inviteToken: token },
  });

  if (!invite || invite.status === "ACCEPTED") {
    return NextResponse.redirect(
      new URL("/login?error=invalid_invite", req.url)
    );
  }

  const session = await getServerSession(authOptions);

  // Agar user login nahi hai, to pehle login karwao, invite link pe wapas bhejo
  if (!session?.user?.email) {
    const callbackUrl = encodeURIComponent(`/api/team/accept?token=${token}`);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, req.url)
    );
  }

  // Sirf wahi Google account invite accept kar sakta hai jisko invite kiya gaya tha
  if (session.user.email.toLowerCase() !== invite.email.toLowerCase()) {
    return NextResponse.redirect(
      new URL("/plans?error=wrong_account_for_invite", req.url)
    );
  }

  await prisma.teamMember.update({
    where: { id: invite.id },
    data: {
      status: "ACCEPTED",
      memberUserId: session.user.id,
      acceptedAt: new Date(),
    },
  });

  return NextResponse.redirect(new URL("/plans/standard/dashboard", req.url));
}
