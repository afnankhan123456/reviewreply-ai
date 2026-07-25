'use server'

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { resolveOwnerAndRole } from '@/lib/getEffectiveOwner';

export async function getGoogleBusinessLocations() {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const { role } = await resolveOwnerAndRole(session.user.id);

    if (role !== 'OWNER') {
      return { error: 'Only the account owner can manage connections.' };
    }

    if (!session.accessToken) {
      return { error: 'No Google access token found. Please login again.' };
    }

    const accountsResponse = await fetch(
      'https://mybusinessaccountmanagement.googleapis.com/v1/accounts',
      { headers: { Authorization: `Bearer ${session.accessToken}` } }
    );
    const accountsData = await accountsResponse.json();

    if (!accountsData.accounts?.length) {
      return { error: 'No Google Business Profile found on this account.' };
    }

    const accountName = accountsData.accounts[0].name;

    const locationsResponse = await fetch(
      `https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations`,
      { headers: { Authorization: `Bearer ${session.accessToken}` } }
    );
    const locationsData = await locationsResponse.json();
    const locations = locationsData.locations || [];

    return {
      success: true,
      locations: locations.map((location: any) => ({
        id: location.name,
        title: location.title,
        address: location.storefrontAddress?.addressLines?.join(', ') || '',
      })),
    };
  } catch (error) {
    console.error('Error fetching business locations:', error);
    return { error: 'Failed to fetch Google Business locations' };
  }
}

export async function getSelectedLocations() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const { ownerId, role } = await resolveOwnerAndRole(session.user.id);

    if (role !== 'OWNER') {
      return { error: 'Only the account owner can manage connections.' };
    }

    const locations = await prisma.businessLocation.findMany({
      where: { userId: ownerId },
      select: { googleLocationId: true, businessName: true, address: true },
      orderBy: { createdAt: 'asc' },
    });

    return {
      success: true,
      locations: locations.map((loc) => ({
        id: loc.googleLocationId,
        title: loc.businessName,
        address: loc.address || '',
      })),
    };
  } catch (error) {
    console.error('Error fetching selected locations:', error);
    return { error: 'Failed to fetch selected locations' };
  }
}

export async function saveSelectedLocation(locationId: string, businessName: string, address: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const { ownerId, role } = await resolveOwnerAndRole(session.user.id);

    if (role !== 'OWNER') {
      return { error: 'Only the account owner can manage connections.' };
    }

    const userId = ownerId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { locationsUsed: true, locationsLimit: true },
    });

    if (!user) {
      return { error: 'User not found' };
    }

    const existingLocation = await prisma.businessLocation.findUnique({
      where: { googleLocationId: locationId },
    });

    const isNewLocationForUser = !existingLocation || existingLocation.userId !== userId;

    if (isNewLocationForUser && user.locationsUsed >= user.locationsLimit) {
      return {
        error: `Your plan allows only ${user.locationsLimit} location(s). Remove a location before adding a new one.`,
      };
    }

    const location = await prisma.businessLocation.upsert({
      where: { googleLocationId: locationId },
      update: { businessName, address, userId },
      create: {
        userId,
        googleLocationId: locationId,
        businessName,
        address,
      },
    });

    const updateData: any = { googleBusinessConnected: true };
    if (isNewLocationForUser) {
      updateData.locationsUsed = { increment: 1 };
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: { locationsUsed: true, locationsLimit: true },
    });

    return {
      success: true,
      location,
      locationsUsed: updatedUser.locationsUsed,
      locationsLimit: updatedUser.locationsLimit,
    };
  } catch (error) {
    console.error('Error saving location:', error);
    return { error: 'Failed to save location' };
  }
}

export async function removeSelectedLocation(locationId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const { ownerId, role } = await resolveOwnerAndRole(session.user.id);

    if (role !== 'OWNER') {
      return { error: 'Only the account owner can manage connections.' };
    }

    const userId = ownerId;

    const location = await prisma.businessLocation.findUnique({
      where: { googleLocationId: locationId },
    });

    if (!location || location.userId !== userId) {
      return { error: 'Location not found' };
    }

    await prisma.businessLocation.delete({
      where: { googleLocationId: locationId },
    });

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        locationsUsed: { decrement: 1 },
      },
      select: { locationsUsed: true, locationsLimit: true },
    });

    const remainingLocations = await prisma.businessLocation.count({
      where: { userId },
    });

    if (remainingLocations === 0) {
      await prisma.user.update({
        where: { id: userId },
        data: { googleBusinessConnected: false },
      });
    }

    return {
      success: true,
      locationsUsed: Math.max(0, updatedUser.locationsUsed),
      locationsLimit: updatedUser.locationsLimit,
    };
  } catch (error) {
    console.error('Error removing location:', error);
    return { error: 'Failed to remove location' };
  }
}
