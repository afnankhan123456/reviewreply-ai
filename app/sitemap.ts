import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://reviewreply-ai-pi.vercel.app",
      lastModified: new Date(),
    },
    {
      url: "https://reviewreply-ai-pi.vercel.app/login",
      lastModified: new Date(),
    },
    {
      url: "https://reviewreply-ai-pi.vercel.app/legal/privacy-policy",
      lastModified: new Date(),
    },
    {
      url: "https://reviewreply-ai-pi.vercel.app/legal/terms",
      lastModified: new Date(),
    },
  ];
}
