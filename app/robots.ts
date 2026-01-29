import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: 'https://hookah-nobel.vercel.app',
    sitemap: 'https://hookah-nobel.vercel.app/sitemap.xml',
  };
}
