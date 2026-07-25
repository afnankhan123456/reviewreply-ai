import { prisma } from './prisma';

/**
 * Google access token ko check karta hai — agar expire ho gaya hai ya jald hoga,
 * to googleRefreshToken se naya access token mangwa ke DB update kar deta hai.
 * Har jagah se call kiya ja sakta hai jahan bhi Google API use ho rahi ho
 * (cron jobs, sync, ya NextAuth JWT callback).
 */
export async function ensureFreshGoogleToken(userId: string): Promise<string | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      googleAccessToken: true,
      googleRefreshToken: true,
      googleTokenExpiresAt: true,
    },
  });

  if (!user?.googleAccessToken) return null;

  const now = Date.now();
  const expiresAt = user.googleTokenExpiresAt ? new Date(user.googleTokenExpiresAt).getTime() : 0;

  // Agar token abhi valid hai (5 min ka safety buffer), to wahi return kar do
  if (expiresAt && expiresAt - now > 5 * 60 * 1000) {
    return user.googleAccessToken;
  }

  // Expire ho chuka hai ya expiry info nahi hai — refresh karna zaroori hai
  if (!user.googleRefreshToken) {
    // Refresh token hi nahi hai — user ko dobara connect karna hoga
    return user.googleAccessToken;
  }

  try {
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID || '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
        grant_type: 'refresh_token',
        refresh_token: user.googleRefreshToken,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.access_token) {
      console.error('Google token refresh failed:', data);
      return user.googleAccessToken;
    }

    const newExpiresAt = new Date(now + (data.expires_in || 3600) * 1000);

    await prisma.user.update({
      where: { id: userId },
      data: {
        googleAccessToken: data.access_token,
        googleTokenExpiresAt: newExpiresAt,
      },
    });

    return data.access_token;
  } catch (error) {
    console.error('Error refreshing Google token:', error);
    return user.googleAccessToken;
  }
}
