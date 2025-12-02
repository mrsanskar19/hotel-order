import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/admin/'], // Hide private areas from Google
    },
    sitemap: 'https://foodslinkx.com/sitemap.xml',
  };
}