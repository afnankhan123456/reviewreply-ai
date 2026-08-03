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

// ✅ Naya function: Appearance settings (theme/accent/font/language) load karne ke liye
export async function getAppearanceSettings() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const { ownerId } = await resolveOwnerAndRole(session.user.id);

    const user = await prisma.user.findUnique({
      where: { id: ownerId },
      select: {
        themeMode: true,
        accentColor: true,
        fontSize: true,
        fontWeight: true,
        language: true,
      },
    });

    if (!user) {
      return { error: 'User not found' };
    }

    return {
      success: true,
      themeMode: user.themeMode || 'dark',
      accentColor: user.accentColor || '#ae47ff',
      fontSize: user.fontSize || 'md',
      fontWeight: user.fontWeight || 'normal',
      language: user.language || 'en',
    };
  } catch (error) {
    console.error('Error fetching appearance settings:', error);
    return { error: 'Failed to fetch appearance settings' };
  }
}

// ✅ Naya function: Appearance settings save/update karne ke liye
export async function saveAppearanceSettings(data: {
  themeMode?: string;
  accentColor?: string;
  fontSize?: string;
  fontWeight?: string;
  language?: string;
}) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const { ownerId, role } = await resolveOwnerAndRole(session.user.id);
    if (role !== 'OWNER') {
      return { error: 'Only the account owner can update settings.' };
    }

    const updated = await prisma.user.update({
      where: { id: ownerId },
      data: {
        ...(data.themeMode ? { themeMode: data.themeMode } : {}),
        ...(data.accentColor ? { accentColor: data.accentColor } : {}),
        ...(data.fontSize ? { fontSize: data.fontSize } : {}),
        ...(data.fontWeight ? { fontWeight: data.fontWeight } : {}),
        ...(data.language ? { language: data.language } : {}),
      },
      select: {
        themeMode: true,
        accentColor: true,
        fontSize: true,
        fontWeight: true,
        language: true,
      },
    });

    return { success: true, ...updated };
  } catch (error) {
    console.error('Error saving appearance settings:', error);
    return { error: 'Failed to save appearance settings' };
  }
}
