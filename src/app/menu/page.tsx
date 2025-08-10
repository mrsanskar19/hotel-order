'use client';

import { useMenu } from '@/hooks/useMenu';
import MenuItemCard from '@/components/MenuItemCard';
import AdBanner from '@/components/AdBanner';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function MenuPage() {
  const { menuItems } = useMenu();
  const { cartCount } = useCart();
  const availableItems = menuItems.filter(item => item.isAvailable);
  const categories = [...new Set(availableItems.map(item => item.category))];

  return (
    <div className="animation-fade-in">
      <header className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 p-4 border-b flex justify-between items-center">
        <h1 className="font-headline text-2xl text-primary">QR Menu Go</h1>
        <Link href="/cart" className="relative">
          <ShoppingCart className="w-6 h-6 text-foreground" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </header>

      <div className="p-4 space-y-8 pb-20">
        <AdBanner />

        {categories.map(category => (
          <section key={category}>
            <h2 className="font-headline text-2xl font-bold mb-4">{category}</h2>
            <div className="grid grid-cols-1 gap-4">
              {availableItems
                .filter(item => item.category === category)
                .map(item => (
                  <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}

         <AdBanner />
      </div>
    </div>
  );
}
