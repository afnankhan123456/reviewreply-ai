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
      select: { googleBusinessConnected: true, gmailConnected: true },
    });
    if (!user) return { error: 'User not found' };
    return {
      success: true,
      googleConnected: user.googleBusinessConnected ?? false,
      gmailConnected: user.gmailConnected ?? false,
    };
  } catch (error) {
    console.error('Error fetching status:', error);
    return { error: 'Failed to fetch connection status' };
  }
}

export async function toggleGoogleBusiness(action: 'connect' | 'disconnect') {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { error: 'Unauthorized' };
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { googleBusinessConnected: true },
    });
    if (user?.googleBusinessConnected === true) {
      return { success: false, message: 'Already Connected', googleConnected: true };
    }
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { googleBusinessConnected: action === 'connect' },
      select: { googleBusinessConnected: true },
    });
    return {
      success: true,
      message: action === 'connect' ? 'Google Business Connected!' : 'Google Business Disconnected!',
      googleConnected: updatedUser.googleBusinessConnected,
    };
  } catch (error) {
    console.error('Error toggling Google:', error);
    return { error: 'Failed to update Google connection' };
  }
}

export async function toggleGmail(action: 'connect' | 'disconnect') {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { error: 'Unauthorized' };
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { gmailConnected: true },
    });
    if (user?.gmailConnected === true) {
      return { success: false, message: 'Already Connected', gmailConnected: true };
    }
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { gmailConnected: action === 'connect' },
      select: { gmailConnected: true },
    });
    return {
      success: true,
      message: action === 'connect' ? 'Gmail Connected!' : 'Gmail Disconnected!',
      gmailConnected: updatedUser.gmailConnected,
    };
  } catch (error) {
    console.error('Error toggling Gmail:', error);
    return { error: 'Failed to update Gmail connection' };
  }
}
