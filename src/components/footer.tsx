
'use client';

import Link from 'next/link';
import { Twitter, Github, Linkedin } from 'lucide-react';
import Logo from './logo';
import { usePathname } from 'next/navigation';


export default function Footer() {
const pathname = usePathname();
const hideFooter = pathname.startsWith('/dashboard') || pathname.startsWith('/hotel');
if(hideFooter) return<div className="mt-8 border-t p-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Desklet, Inc. All rights reserved.
        </div>
  return (
    <footer className="bg-muted py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              The ultimate solution for modern hotel order management.
            </p>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Product</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link></li>
              <li><Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground">Docs</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">Login</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/team" className="text-sm text-muted-foreground hover:text-foreground">Team</Link></li>
              <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground">Careers</Link></li>
               <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Connect</h3>
            <div className="mt-4 flex space-x-4">
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-6 w-6 text-muted-foreground hover:text-foreground" />
              </Link>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-6 w-6 text-muted-foreground hover:text-foreground" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 text-muted-foreground hover:text-foreground" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Desklet, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
