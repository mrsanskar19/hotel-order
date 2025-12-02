import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';
// import Chatbot from '@/components/chatbot';

// 1. Optimize Fonts with next/font (Better Performance = Better SEO)
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  variable: '--font-space',
  display: 'swap', 
});

// 2. Define Base URL (Replace with your actual domain)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://foodslinkx.com'; 

export const viewport: Viewport = {
  themeColor: '#DC2626', // Matches your red theme
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'FoodsLinkX - Smart Hotel Order Management System',
    template: '%s | FoodsLinkX',
  },
  description: 'Streamline hotel food ordering, kitchen display systems (KDS), and digital menus with FoodsLinkX. The all-in-one F&B operating system for modern hotels and restaurants.',
  keywords: [
    'Hotel Order Management',
    'Digital Menu for Hotels',
    'QR Code Ordering System',
    'Kitchen Display System (KDS)',
    'Room Service Software',
    'Restaurant POS Integration',
    'Contactless Dining',
    'Hospitality Technology',
    'FoodsLinkX'
  ],
  authors: [{ name: 'Sanskarut Tech', url: SITE_URL }],
  creator: 'Sanskarut Tech',
  publisher: 'FoodsLinkX',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: 'FoodsLinkX - Smart Hotel F&B OS',
    description: 'Boost revenue and guest satisfaction with the #1 digital ordering platform for hotels.',
    siteName: 'FoodsLinkX',
    images: [
      {
        url: '/og-image.jpg', // You need to add this image to your public folder
        width: 1200,
        height: 630,
        alt: 'FoodsLinkX Dashboard Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FoodsLinkX - Hotel Order Management',
    description: 'Transform your room service and kitchen operations today.',
    images: ['/og-image.jpg'],
    creator: '@FoodsLinkX', // Replace with actual handle
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // 3. JSON-LD Structured Data for Google Rich Results
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'FoodsLinkX',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '599',
      priceCurrency: 'INR',
    },
    description: 'A comprehensive hotel order management system improving guest experience and kitchen efficiency.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body antialiased bg-gray-50 text-gray-900">
        {/* Inject Structured Data */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CYL0VF58MX"
          strategy="afterInteractive"
        />
        
        {/* 2. Initialize Google Analytics */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CYL0VF58MX');
          `}
        </Script>
        
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        
        {/* <Chatbot /> */}
        <Toaster />
      </body>
    </html>
  );
}