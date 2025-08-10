'use client';

import { useState } from 'react';
import { useMenu } from '@/hooks/useMenu';
import MenuItemCard from '@/components/MenuItemCard';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image';
import { AppLogo } from '@/components/AppLogo';

export default function MenuPage() {
  const { menuItems } = useMenu();
  const { cartCount } = useCart();
  const availableItems = menuItems.filter(item => item.isAvailable);
  const categories = ['All', ...new Set(availableItems.map(item => item.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = selectedCategory === 'All'
    ? availableItems
    : availableItems.filter(item => item.category === selectedCategory);

  return (
    <div className="animation-fade-in">
      <header className="sticky top-0 bg-background/90 backdrop-blur-sm z-10 p-4 border-b flex justify-between items-center">
        <div className="flex items-center">
          <AppLogo className="w-8 h-8 text-primary" />
          <h1 className="font-headline text-2xl text-primary ml-2">The Grand Hotel</h1>
        </div>
        <Link href="/cart" className="relative">
          <ShoppingCart className="w-7 h-7 text-foreground" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </header>

      <div className="p-4 space-y-8 pb-20">
        <Carousel className="w-full">
          <CarouselContent>
            {menuItems.slice(0, 3).map((item, index) => (
              <CarouselItem key={index}>
                <div className="bg-card rounded-lg shadow-md overflow-hidden aspect-video relative">
                    <Image 
                        src={item.imageUrl} 
                        alt={item.name} 
                        layout="fill" 
                        objectFit="cover"
                        data-ai-hint={item['data-ai-hint']}
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
                        <h3 className="text-white font-headline text-2xl">{item.name}</h3>
                        <p className="text-white/90 text-sm">{item.description}</p>
                    </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>

        <div>
            <h2 className="font-headline text-3xl font-bold mb-4 text-gray-800">Menu</h2>
            <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
                {categories.map(category => (
                <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    className="rounded-full"
                >
                    {category}
                </Button>
                ))}
            </div>
        </div>


        <section>
            <div className="grid grid-cols-1 gap-4">
              {filteredItems.map(item => (
                  <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
        </section>
      </div>
    </div>
  );
}
