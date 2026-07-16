'use server'

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export async function getConnectionStatus() {
  try {
    console.log('🔍 getConnectionStatus called');
    const session = await getServerSession(authOptions);
    console.log('🔍 Session from getServerSession:', session);
    console.log('🔍 Session User Email:', session?.user?.email);

    if (!session?.user?.id && !session?.user?.email) {
      console.error('❌ Session missing or user id/email missing');
      return { error: 'Unauthorized' };
    }

    // ✅ Try to find user by ID first, then by email as fallback
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { id: session.user.id },
          { email: session.user.email }
        ]
      },
      select: { 
        googleBusinessConnected: true, 
        gmailConnected: true,
        email: true,
        id: true
      },
    });

    console.log('🔍 User from DB:', user);

    if (!user) {
      console.error('❌ User not found in DB for ID:', session.user.id, 'Email:', session.user.email);
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

    if (!session?.user?.id && !session?.user?.email) {
      console.error('❌ Unauthorized: session null or missing id/email');
      return { error: 'Unauthorized' };
    }

    // ✅ Find user by ID or email
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { id: session.user.id },
          { email: session.user.email }
        ]
      },
      select: { googleBusinessConnected: true, email: true, id: true },
    });

    console.log('🔍 User in toggleGoogleBusiness:', user);

    if (user?.googleBusinessConnected === true) {
      console.log('✅ Already connected, returning false');
      return { success: false, message: 'Already Connected', googleConnected: true };
    }

    // ✅ Update using email (more reliable when ID might be mismatched)
    const updatedUser = await prisma.user.update({
      where: { email: user?.email || session.user.email },
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

    if (!session?.user?.id && !session?.user?.email) {
      console.error('❌ Unauthorized: session null or missing id/email');
      return { error: 'Unauthorized' };
    }

    // ✅ Find user by ID or email
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { id: session.user.id },
          { email: session.user.email }
        ]
      },
      select: { gmailConnected: true, email: true, id: true },
    });

    console.log('🔍 User in toggleGmail:', user);

    if (user?.gmailConnected === true) {
      console.log('✅ Already connected, returning false');
      return { success: false, message: 'Already Connected', gmailConnected: true };
    }

    // ✅ Update using email (more reliable when ID might be mismatched)
    const updatedUser = await prisma.user.update({
      where: { email: user?.email || session.user.email },
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
