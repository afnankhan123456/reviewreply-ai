'use server'

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { resolveOwnerAndRole } from '@/lib/getEffectiveOwner';
import { randomBytes } from 'crypto';

// Team page ka poora data laane ke liye — sirf Owner ko access
export async function getTeamData() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const { ownerId, role } = await resolveOwnerAndRole(session.user.id);

    if (role !== 'OWNER') {
      return { error: 'Only the account owner can access team management.' };
    }

    const owner = await prisma.user.findUnique({
      where: { id: ownerId },
      select: { teamMembersLimit: true },
    });

    const members = await prisma.teamMember.findMany({
      where: { ownerId },
      orderBy: { invitedAt: 'asc' },
    });

    return {
      success: true,
      membersLimit: owner?.teamMembersLimit ?? 2,
      membersUsed: members.length,
      members: members.map((m) => ({
        id: m.id,
        email: m.email,
        accessLevel: m.accessLevel,
        status: m.status,
        inviteToken: m.status === 'PENDING' ? m.inviteToken : null,
      })),
    };
  } catch (error) {
    console.error('Error fetching team data:', error);
    return { error: 'Failed to fetch team data' };
  }
}

// Naya member invite karna — sirf Owner
export async function inviteTeamMember(email: string, accessLevel: 'FULL_ACCESS' | 'VIEW_ONLY') {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const { ownerId, role } = await resolveOwnerAndRole(session.user.id);

    if (role !== 'OWNER') {
      return { error: 'Only the account owner can invite team members.' };
    }

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { error: 'Please enter a valid email address.' };
    }

    const owner = await prisma.user.findUnique({
      where: { id: ownerId },
      select: { teamMembersLimit: true, email: true },
    });

    if (!owner) {
      return { error: 'Owner account not found.' };
    }

    if (cleanEmail === owner.email.toLowerCase()) {
      return { error: 'You cannot invite yourself.' };
    }

    const existingCount = await prisma.teamMember.count({
      where: { ownerId },
    });

    if (existingCount >= (owner.teamMembersLimit ?? 2)) {
      return {
        error: `Your plan allows only ${owner.teamMembersLimit ?? 2} team member(s). Remove a member before adding a new one.`,
      };
    }

    const alreadyInvited = await prisma.teamMember.findFirst({
      where: { ownerId, email: cleanEmail },
    });

    if (alreadyInvited) {
      return { error: 'This email has already been invited.' };
    }

    const inviteToken = randomBytes(24).toString('hex');

    const newMember = await prisma.teamMember.create({
      data: {
        ownerId,
        email: cleanEmail,
        accessLevel,
        status: 'PENDING',
        inviteToken,
      },
    });

    const inviteLink = `${process.env.NEXTAUTH_URL || ''}/api/team/accept?token=${inviteToken}`;

    return {
      success: true,
      member: {
        id: newMember.id,
        email: newMember.email,
        accessLevel: newMember.accessLevel,
        status: newMember.status,
      },
      inviteLink,
    };
  } catch (error) {
    console.error('Error inviting team member:', error);
    return { error: 'Failed to invite team member' };
  }
}

// Kisi member ka access level badalna — sirf Owner
export async function updateMemberAccess(memberId: string, accessLevel: 'FULL_ACCESS' | 'VIEW_ONLY') {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const { ownerId, role } = await resolveOwnerAndRole(session.user.id);

    if (role !== 'OWNER') {
      return { error: 'Only the account owner can change access levels.' };
    }

    const member = await prisma.teamMember.findUnique({ where: { id: memberId } });
    if (!member || member.ownerId !== ownerId) {
      return { error: 'Team member not found.' };
    }

    await prisma.teamMember.update({
      where: { id: memberId },
      data: { accessLevel },
    });

    return { success: true };
  } catch (error) {
    console.error('Error updating member access:', error);
    return { error: 'Failed to update access level' };
  }
}

// Member remove karna — sirf Owner
export async function removeTeamMember(memberId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const { ownerId, role } = await resolveOwnerAndRole(session.user.id);

    if (role !== 'OWNER') {
      return { error: 'Only the account owner can remove team members.' };
    }

    const member = await prisma.teamMember.findUnique({ where: { id: memberId } });
    if (!member || member.ownerId !== ownerId) {
      return { error: 'Team member not found.' };
    }

    await prisma.teamMember.delete({ where: { id: memberId } });

    return { success: true };
  } catch (error) {
    console.error('Error removing team member:', error);
    return { error: 'Failed to remove team member' };
  }
}
