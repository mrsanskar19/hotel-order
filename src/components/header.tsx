'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import Logo from './logo';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/features', label: 'Features' },
  {href: '/pricing', label: 'Pricing' },
  // { href: '/docs', label: 'Docs' },
  // { href: '/blog', label: 'Blog' },
  // { href: '/team', label: 'Team' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
];

export default function Header() {
  const pathname = usePathname();
  const hideHeader = pathname.startsWith('/dashboard') || pathname.startsWith('/hotel');
  if (hideHeader) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/50 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center space-x-3">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative transition-colors hover:text-foreground/90',
                pathname === link.href ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right: CTA + Mobile Menu */}
        <div className="flex items-center space-x-3">
          <Link href="/contact" className="hidden md:block">
            <Button
  className="w-full relative overflow-hidden border-2 border-red-600 text-red-600 bg-transparent transition-colors duration-300 ease-in-out group"
>
  {/* transform-based background for GPU-accelerated smoothness */}
  <span className="absolute inset-0 transform scale-x-0 origin-left transition-transform duration-300 ease-in-out pointer-events-none z-0 group-hover:scale-x-100 bg-red-600" />
  <span className="relative z-10 inline-block px-4 py-2 transition-colors duration-300 group-hover:text-white">
    Book Demo
  </span>
</Button>

          </Link>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-6">
                <SheetTitle className="sr-only">Main Menu</SheetTitle>
                <nav className="flex flex-col space-y-5 mt-10 text-lg">
                  <Logo />
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          'block px-2 py-1 transition-colors',
                          pathname === link.href ? 'text-primary font-semibold' : 'text-muted-foreground'
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link href="/contact">
                      <Button
  className="w-full mt-4 relative overflow-hidden border-2 border-red-600 text-red-600 bg-transparent transition-colors duration-300 ease-in-out group"
>
  {/* transform-based background for GPU-accelerated smoothness */}
  <span className="absolute inset-0 transform scale-x-0 origin-left transition-transform duration-300 ease-in-out pointer-events-none z-0 group-hover:scale-x-100 bg-red-600" />
  <span className="relative z-10 inline-block px-4 py-2 transition-colors duration-300 group-hover:text-white">
    Book Demo
  </span>
</Button>


                    </Link>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
