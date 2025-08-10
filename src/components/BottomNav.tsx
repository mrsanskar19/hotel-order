'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingCart, UserCog } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';

const navItems = [
  { href: '/menu', icon: Home, label: 'Menu' },
  { href: '/cart', icon: ShoppingCart, label: 'Cart' },
  { href: '/admin/login', icon: UserCog, label: 'Admin' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { cartCount } = useCart();

  // Hide nav on admin pages, except login
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    return null;
  }

  return (
    <nav className="sticky bottom-0 left-0 right-0 h-16 bg-card border-t border-border shadow-t-lg z-50">
      <div className="flex justify-around items-center h-full max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = (pathname.startsWith(item.href) && item.href !== '/') || pathname === item.href;
          return (
            <Link href={item.href} key={item.href} className={cn(
              "flex flex-col items-center justify-center w-full h-full text-sm font-medium transition-all duration-300 ease-in-out",
              isActive ? 'text-primary scale-110' : 'text-muted-foreground hover:text-primary'
            )}>
              <div className="relative">
                <item.icon className="w-6 h-6" />
                {item.href === '/cart' && cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="mt-1 text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
