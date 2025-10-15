'use client';

import Link from 'next/link';
import { Twitter, Github, Linkedin, Facebook, Instagram, Youtube } from 'lucide-react';
import Logo from './logo';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';

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
              <li><Link href="/term" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="text-sm text-muted-foreground hover:text-foreground">Cookie Policy</Link></li>
              <li><Link href="/security-policy" className="text-sm text-muted-foreground hover:text-foreground">Security</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-headline text-lg font-semibold">Connect With Us</h3>
            <div className="mt-4 flex flex-col gap-4">
                <p className="text-sm text-muted-foreground">
                    Have questions or want to learn more? Reach out to us.
                </p>
                <Link href="/contact">
                    <Button className="w-full">Contact Us</Button>
                </Link>
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
