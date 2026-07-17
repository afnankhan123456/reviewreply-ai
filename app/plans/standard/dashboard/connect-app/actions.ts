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

    // Standard: 450 user-pool + 50 reserved-critical-pool (total 500)
    // Basic: 100 shared pool, koi reserve nahi
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
