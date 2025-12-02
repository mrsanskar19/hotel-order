// lib/seo.ts
import { Metadata } from 'next';

interface MetadataProps {
  title: string;
  description?: string;
  image?: string; // Optional custom image
  noIndex?: boolean; // Option to hide page from Google
}

// Default configuration
const defaultUrl = process.env.NEXT_PUBLIC_URL || 'https://foodslinkx.com';
const defaultImage = '/images/og-default.jpg';

export function constructMetadata({
  title,
  description = "The ultimate solution for modern hotel order management.", // Default description
  image = defaultImage,
  noIndex = false
}: MetadataProps): Metadata {
  
  return {
    title: title, // 'template' in layout.tsx will add "| FoodsLinkX" automatically
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [image],
    },
    icons: {
      icon: '/favicon.ico',
    },
    metadataBase: new URL(defaultUrl),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}