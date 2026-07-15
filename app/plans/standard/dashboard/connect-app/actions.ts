'use server'

// ✅ Import Prisma Client aur NextAuth Session
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

// ✅ 1. Get Connection Status (Page load pe check karega)
export async function getConnectionStatus() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        googleBusinessConnected: true,
        gmailConnected: true,
      }
    });

    if (!user) {
      return { error: 'User not found' };
    }

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

// ✅ 2. Connect/Disconnect Google Business ID (FIXED)
export async function toggleGoogleBusiness(action: 'connect' | 'disconnect') {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { googleBusinessConnected: true }
    });

    // ✅ FIXED: Agar pehle se connected hai, toh force se return kar do
    if (user?.googleBusinessConnected === true) {
      return { 
        success: false, 
        message: 'Already Connected',
        googleConnected: true 
      };
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        googleBusinessConnected: action === 'connect',
      },
      select: { googleBusinessConnected: true }
    });

    return {
      success: true,
      message: action === 'connect' ? 'Google Business Connected!' : 'Google Business Disconnected!',
      googleConnected: updatedUser.googleBusinessConnected
    };

  } catch (error) {
    console.error('Error toggling Google:', error);
    return { error: 'Failed to update Google connection' };
  }
}

// ✅ 3. Connect/Disconnect Gmail (FIXED)
export async function toggleGmail(action: 'connect' | 'disconnect') {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { gmailConnected: true }
    });

    // ✅ FIXED: Agar pehle se connected hai, toh force se return kar do
    if (user?.gmailConnected === true) {
      return { 
        success: false, 
        message: 'Already Connected',
        gmailConnected: true 
      };
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        gmailConnected: action === 'connect',
      },
      select: { gmailConnected: true }
    });

    return {
      success: true,
      message: action === 'connect' ? 'Gmail Connected!' : 'Gmail Disconnected!',
      gmailConnected: updatedUser.gmailConnected
    };

  } catch (error) {
    console.error('Error toggling Gmail:', error);
    return { error: 'Failed to update Gmail connection' };
  }
}
