'use client';

import Link from 'next/link';
import { Twitter, Github, Linkedin, Facebook, Instagram, Youtube } from 'lucide-react';
import Logo from './logo';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const hideFooter = pathname.startsWith('/dashboard') || pathname.startsWith('/hotel');

  if (hideFooter) {
    return (
      <div className="mt-8 border-t p-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} FoodsLinkX. All rights reserved.
      </div>
    );
  }

  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Logo + Intro */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground leading-relaxed">
              FoodsLinkX is the smart hotel order management software that simplifies 
              food requests, menu customization, and real-time tracking — all in one platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-headline text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-foreground">Home</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About</Link></li>
              <li><Link href="/#features" className="text-sm text-muted-foreground hover:text-foreground">Features</Link></li>
              <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>

          {/* Privacy & Legal */}
          <div>
            <h3 className="font-headline text-lg font-semibold">Privacy & Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">Cookie Policy</Link></li>
              <li><Link href="/security" className="text-sm text-muted-foreground hover:text-foreground">Security</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-headline text-lg font-semibold">Connect With Us</h3>
            <div className="mt-4 flex flex-wrap gap-4">
              <form className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
    <input
      type="email"
      placeholder="Enter your email"
      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
    />
    <button
      type="submit"
      className="px-6 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition"
    >
      Subscribe
    </button>
  </form>
  <p className="mt-2 text-xs text-muted-foreground">
    Get the latest updates, product news, and exclusive offers.
  </p>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t pt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} FoodsLinkX. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

