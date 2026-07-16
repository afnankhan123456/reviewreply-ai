'use server'

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export async function getGooglePlaceId() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
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

    await prisma.user.update({
      where: { id: session.user.id },
      data: { googlePlaceId: placeId },
    });

    return { message: 'Google Place ID saved successfully!' };
  } catch (error) {
    console.error('Error saving Place ID:', error);
    return { message: 'Failed to save Place ID. Please try again.' };
  }
}
