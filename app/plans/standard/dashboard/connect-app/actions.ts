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

export async function saveSelectedLocation(locationId: string, businessName: string, address: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const location = await prisma.businessLocation.upsert({
      where: { googleLocationId: locationId },
      update: { businessName, address, userId: session.user.id },
      create: {
        userId: session.user.id,
        googleLocationId: locationId,
        businessName,
        address,
      },
    });

    await prisma.user.update({
      where: { id: session.user.id },
      data: { googleBusinessConnected: true },
    });

    return { success: true, location };
  } catch (error) {
    console.error('Error saving location:', error);
    return { error: 'Failed to save location' };
  }
}
