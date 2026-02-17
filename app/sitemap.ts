import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://shishanobel.com',
      lastModified: new Date(),
    },
  ];
}

