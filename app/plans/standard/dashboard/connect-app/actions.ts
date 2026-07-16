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

    // Plan ke hisaab se limit decide hoti hai: basic = 100, standard = 500
    const limitForPlan = currentUser.plan === 'standard' ? 500 : 100;

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        gmailConnected: action === 'connect',
        alertEmailsLimit: action === 'connect' ? limitForPlan : 0,
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
