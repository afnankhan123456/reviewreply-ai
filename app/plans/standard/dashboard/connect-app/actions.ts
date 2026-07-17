'use server'

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export async function getConnectionStatus() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        gmailConnected: true,
        alertEmailsLimit: true,
        alertEmailsSent: true,
        googleConnected: true,
        locationsUsed: true,
        locationsLimit: true,
      }
    });

    if (!user) {
      return { error: 'User not found' };
    }

    return {
      success: true,
      gmailConnected: user.gmailConnected ?? false,
      alertEmailsLimit: user.alertEmailsLimit ?? 100,
      alertEmailsSent: user.alertEmailsSent ?? 0,
      googleConnected: user.googleConnected ?? false,
      locationsUsed: user.locationsUsed ?? 0,
      locationsLimit: user.locationsLimit ?? 1,
    };
  } catch (error) {
    console.error('Error fetching status:', error);
    return { error: 'Failed to fetch connection status' };
  }
}

export async function toggleGmail(action: 'connect' | 'disconnect') {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { gmailConnected: true, plan: true }
    });

    if (!currentUser) {
      return { error: 'User not found' };
    }

    const isStandard = currentUser.plan?.startsWith('standard');

    const alertLimit = isStandard ? 450 : 100;
    const criticalLimit = isStandard ? 50 : 0;

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        gmailConnected: action === 'connect',
        alertEmailsLimit: action === 'connect' ? alertLimit : 0,
        criticalEmailsLimit: action === 'connect' ? criticalLimit : 0,
      },
      select: { gmailConnected: true, alertEmailsLimit: true }
    });

    return {
      success: true,
      message: action === 'connect' ? 'Gmail Connected!' : 'Gmail Disconnected!',
      gmailConnected: updatedUser.gmailConnected,
      alertEmailsLimit: updatedUser.alertEmailsLimit,
    };
  } catch (error) {
    console.error('Error toggling Gmail:', error);
    return { error: 'Failed to update Gmail connection' };
  }
}

export async function getGoogleBusinessLocations() {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
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

// Naya function: user ki already-selected locations laane ke liye (page load par)
export async function getSelectedLocations() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const locations = await prisma.businessLocation.findMany({
      where: { userId: session.user.id },
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

    const userId = session.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { locationsUsed: true, locationsLimit: true },
    });

    if (!user) {
      return { error: 'User not found' };
    }

    // Check karo ki ye location pehle se kisi user ke against saved hai ya nahi
    const existingLocation = await prisma.businessLocation.findUnique({
      where: { googleLocationId: locationId },
    });

    const isNewLocationForUser = !existingLocation || existingLocation.userId !== userId;

    // Sirf tabhi limit check karo jab ye ek NAYI location ho is user ke liye
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

// Naya function: selected location remove karne ke liye (dusri location select karne ki jagah banane ke liye)
export async function removeSelectedLocation(locationId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const userId = session.user.id;

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
