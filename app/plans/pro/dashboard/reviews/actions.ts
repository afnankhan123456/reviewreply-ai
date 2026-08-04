'use server'

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { resolveOwnerAndRole } from '@/lib/getEffectiveOwner';

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export async function getMySlug() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { error: 'Unauthorized' };

    const { ownerId } = await resolveOwnerAndRole(session.user.id);

    const user = await prisma.user.findUnique({
      where: { id: ownerId },
      select: { slug: true },
    });

    return { success: true, slug: user?.slug || null };
  } catch (error) {
    console.error('Error fetching slug:', error);
    return { error: 'Failed to fetch slug' };
  }
}

export async function saveSlug(desiredSlug: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { error: 'Unauthorized' };

    const { ownerId, role } = await resolveOwnerAndRole(session.user.id);
    if (role === 'VIEW_ONLY') {
      return { error: 'You have view-only access and cannot change this.' };
    }

    const cleanSlug = slugify(desiredSlug);
    if (!cleanSlug || cleanSlug.length < 3) {
      return { error: 'Slug must be at least 3 characters (letters, numbers, hyphens only).' };
    }

    const existing = await prisma.user.findUnique({ where: { slug: cleanSlug } });
    if (existing && existing.id !== ownerId) {
      return { error: 'This URL is already taken. Please choose another.' };
    }

    await prisma.user.update({
      where: { id: ownerId },
      data: { slug: cleanSlug },
    });

    return { success: true, slug: cleanSlug };
  } catch (error) {
    console.error('Error saving slug:', error);
    return { error: 'Failed to save slug' };
  }
}
