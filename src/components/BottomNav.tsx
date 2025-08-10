'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingCart, UserCog, QrCode, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';

const navItems = [
  { href: '/menu', icon: Home, label: 'Menu' },
  { href: '/track-order', icon: Timer, label: 'Track' },
  { href: '/cart', icon: ShoppingCart, label: 'Cart' },
  { href: '/admin/login', icon: UserCog, label: 'Admin' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { cartCount } = useCart();

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    return null;
  }

  const isLinkActive = (href: string) => {
    if (href === '/menu') return pathname.startsWith('/menu') || pathname.startsWith('/item');
    return pathname.startsWith(href);
  }

  const leftItems = navItems.slice(0, 2);
  const rightItems = navItems.slice(2);

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-transparent z-50">
      <div className="flex justify-around items-end h-full max-w-md mx-auto relative">
        <div className="absolute bottom-0 left-0 w-full h-16 bg-card border-t border-border shadow-t-lg flex justify-around items-center">
            {leftItems.map((item) => (
              <Link href={item.href} key={item.href} className={cn(
                "flex flex-col items-center justify-center w-1/4 h-full text-sm font-medium transition-all duration-300 ease-in-out",
                isLinkActive(item.href) ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              )}>
                <item.icon className="w-6 h-6 mb-1" />
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Placeholder for the central button */}
            <div className="w-1/4"></div>

            {rightItems.map((item) => (
               <Link href={item.href} key={item.href} className={cn(
                "flex flex-col items-center justify-center w-1/4 h-full text-sm font-medium transition-all duration-300 ease-in-out relative",
                isLinkActive(item.href) ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              )}>
                 <div className="relative">
                    <item.icon className="w-6 h-6 mb-1" />
                    {item.href === '/cart' && cartCount > 0 && (
                        <span className="absolute -top-1 -right-2.5 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                            {cartCount}
                        </span>
                    )}
                 </div>
                <span>{item.label}</span>
              </Link>
            ))}
        </div>
        
        {/* Central Scan Button */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-20 h-20 flex items-center justify-center">
            <Link href="/scan" className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg transform transition-transform hover:scale-105">
                <QrCode className="w-8 h-8 text-primary-foreground" />
            </Link>
        </div>
      </div>
    </nav>
  );
}
