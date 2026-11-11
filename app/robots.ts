import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/plans/', '/login', '/reviews', '/api/'],
      },
    ],
    sitemap: 'https://www.reviewreply-ai.in/sitemap.xml',
    host: 'https://www.reviewreply-ai.in',
  };
}
