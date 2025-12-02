'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, LogIn } from 'lucide-react';

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
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
];

export default function Header() {
  const pathname = usePathname();
  const hideHeader = pathname.startsWith('/dashboard') || pathname.startsWith('/hotel');
  if (hideHeader) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-red-100 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm transition-all duration-300">
      <div className="container flex h-16 items-center justify-between">
        
        {/* Left: Logo with Hover Scale */}
        <div className="flex items-center space-x-3 transition-transform duration-300 hover:scale-105">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative group transition-colors duration-300',
                pathname === link.href ? 'text-red-600 font-bold' : 'text-foreground/70 hover:text-red-600'
              )}
            >
              {link.label}
              {/* Animated Underline */}
              <span className={cn(
                "absolute -bottom-1 left-0 h-[2px] w-0 bg-red-600 transition-all duration-300 ease-out group-hover:w-full",
                pathname === link.href && "w-full"
              )} />
            </Link>
          ))}
        </nav>

        {/* Right: CTA + Login + Mobile Menu */}
        <div className="flex items-center space-x-4">
          
          {/* Login Button - Desktop */}
          <Link href="/login" className="hidden md:block">
            <Button variant="ghost" className="hover:text-red-600 hover:bg-red-50 transition-colors">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          </Link>

          {/* Book Button - Desktop */}
          <Link href="https://app-foodslinkx.vercel.app/auth/signup" className="hidden md:block">
            <Button
              className="relative overflow-hidden border-2 border-red-600 text-red-600 bg-transparent transition-all duration-300 ease-out group hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]"
            >
              <span className="absolute inset-0 transform scale-x-0 origin-left transition-transform duration-300 ease-out pointer-events-none z-0 group-hover:scale-x-100 bg-red-600" />
              <span className="relative z-10 font-semibold transition-colors duration-300 group-hover:text-white">
              Get Start
              </span>
            </Button>
          </Link>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:text-red-600 hover:bg-red-50">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-6 border-r-red-100">
                <SheetTitle className="sr-only">Main Menu</SheetTitle>
                <nav className="flex flex-col space-y-6 mt-10 text-lg">
                  <div className="transition-transform hover:scale-105 origin-left">
                    <Logo />
                  </div>
                  
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          'block px-2 py-1 transition-all duration-200 border-l-2 border-transparent hover:border-red-600 hover:pl-4 hover:text-red-600',
                          pathname === link.href ? 'text-red-600 font-bold border-red-600 pl-4' : 'text-muted-foreground'
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}

                  <div className="pt-6 flex flex-col gap-4">
                    <SheetClose asChild>
                       <Link href="/login">
                        <Button variant="outline" className="w-full justify-start border-red-200 hover:text-red-600 hover:border-red-600">
                           <LogIn className="mr-2 h-4 w-4" /> Login
                        </Button>
                       </Link>
                    </SheetClose>

                    <SheetClose asChild>
                      <Link href="https://app-foodslinkx.vercel.app/auth/signup">
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200">
                          Get Start
                        </Button>
                      </Link>
                    </SheetClose>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}