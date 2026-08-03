'use server'

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { resolveOwnerAndRole } from '@/lib/getEffectiveOwner';

export async function getGooglePlaceId() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const { ownerId, role } = await resolveOwnerAndRole(session.user.id);
    if (role !== 'OWNER') {
      return { error: 'Only the account owner can access settings.' };
    }

    const user = await prisma.user.findUnique({
      where: { id: ownerId },
      select: { googlePlaceId: true },
    });

    return { placeId: user?.googlePlaceId || '' };
  } catch (error) {
    console.error('Error fetching Place ID:', error);
    return { error: 'Failed to fetch Place ID' };
  }
}

export async function saveGooglePlaceId(placeId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { message: 'Unauthorized' };
    }

    const { ownerId, role } = await resolveOwnerAndRole(session.user.id);
    if (role !== 'OWNER') {
      return { message: 'Only the account owner can update settings.' };
    }

    await prisma.user.update({
      where: { id: ownerId },
      data: { googlePlaceId: placeId },
    });

    return { message: 'Google Place ID saved successfully!' };
  } catch (error) {
    console.error('Error saving Place ID:', error);
    return { message: 'Failed to save Place ID. Please try again.' };
  }
}
