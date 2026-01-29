import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://hookah-nobel.vercel.app',
      lastModified: new Date(),
    },
  ];
}
