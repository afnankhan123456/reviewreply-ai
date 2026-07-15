'use server'

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export async function getConnectionStatus() {
  try {
    console.log('🔍 getConnectionStatus called');
    const session = await getServerSession(authOptions);
    console.log('🔍 Session from getServerSession:', session);

    if (!session?.user?.id) {
      console.error('❌ Session missing or user id missing');
      return { error: 'Unauthorized' };
    }

    console.log('🔍 User ID:', session.user.id);

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { googleBusinessConnected: true, gmailConnected: true },
    });

    console.log('🔍 User from DB:', user);

    if (!user) {
      console.error('❌ User not found in DB for ID:', session.user.id);
      return { error: 'User not found' };
    }

    console.log('✅ googleBusinessConnected:', user.googleBusinessConnected, 'gmailConnected:', user.gmailConnected);

    return {
      success: true,
      googleConnected: user.googleBusinessConnected ?? false,
      gmailConnected: user.gmailConnected ?? false,
    };
  } catch (error) {
    console.error('❌ Error in getConnectionStatus:', error);
    return { error: 'Failed to fetch connection status' };
  }
}

export async function toggleGoogleBusiness(action: 'connect' | 'disconnect') {
  try {
    console.log(`🔍 toggleGoogleBusiness called with action: ${action}`);
    const session = await getServerSession(authOptions);
    console.log('🔍 Session in toggleGoogleBusiness:', session);

    if (!session?.user?.id) {
      console.error('❌ Unauthorized: session null or missing id');
      return { error: 'Unauthorized' };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { googleBusinessConnected: true },
    });

    console.log('🔍 User in toggleGoogleBusiness:', user);

    if (user?.googleBusinessConnected === true) {
      console.log('✅ Already connected, returning false');
      return { success: false, message: 'Already Connected', googleConnected: true };
    }

    console.log('🔍 Proceeding to update googleBusinessConnected to', action === 'connect');

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { googleBusinessConnected: action === 'connect' },
      select: { googleBusinessConnected: true },
    });

    console.log('✅ Updated user:', updatedUser);

    return {
      success: true,
      message: action === 'connect' ? 'Google Business Connected!' : 'Google Business Disconnected!',
      googleConnected: updatedUser.googleBusinessConnected,
    };
  } catch (error) {
    console.error('❌ Error in toggleGoogleBusiness:', error);
    return { error: 'Failed to update Google connection' };
  }
}

export async function toggleGmail(action: 'connect' | 'disconnect') {
  try {
    console.log(`🔍 toggleGmail called with action: ${action}`);
    const session = await getServerSession(authOptions);
    console.log('🔍 Session in toggleGmail:', session);

    if (!session?.user?.id) {
      console.error('❌ Unauthorized: session null or missing id');
      return { error: 'Unauthorized' };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { gmailConnected: true },
    });

    console.log('🔍 User in toggleGmail:', user);

    if (user?.gmailConnected === true) {
      console.log('✅ Already connected, returning false');
      return { success: false, message: 'Already Connected', gmailConnected: true };
    }

    console.log('🔍 Proceeding to update gmailConnected to', action === 'connect');

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { gmailConnected: action === 'connect' },
      select: { gmailConnected: true },
    });

    console.log('✅ Updated user:', updatedUser);

    return {
      success: true,
      message: action === 'connect' ? 'Gmail Connected!' : 'Gmail Disconnected!',
      gmailConnected: updatedUser.gmailConnected,
    };
  } catch (error) {
    console.error('❌ Error in toggleGmail:', error);
    return { error: 'Failed to update Gmail connection' };
  }
}
