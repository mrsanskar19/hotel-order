
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { Star, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { menuItems } from '@/data/menu';
import type { MenuItem } from '@/lib/types';
import { useCart } from '@/hooks/use-cart';

import { AppHeader } from '@/components/app-header';
import { ItemDetailsSheet } from '@/components/item-details-sheet';
import { CartSheet } from '@/components/cart-sheet';
import { ReviewDialog } from '@/components/review-dialog';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/bottom-nav';

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isItemSheetOpen, setIsItemSheetOpen] = useState(false);
  const [isCartSheetOpen, setIsCartSheetOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsItemSheetOpen(true);
  };

  const handleAddToCart = (item: MenuItem, quantity: number = 1, fromSheet: boolean = false) => {
    addToCart(item, quantity);
    if(fromSheet) {
      setIsItemSheetOpen(false);
    }
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${item.name} is waiting for you.`,
    });
    // Reset item selection after a short delay if coming from sheet
    if(fromSheet) {
      setTimeout(() => setSelectedItem(null), 300);
    }
  };

  const handleOrderPlaced = () => {
    // Simulate order status updates with toasts
    setTimeout(() => {
      toast({ title: 'Order Updated!', description: "We're preparing your feast." });
      setTimeout(() => toast({ title: 'Cooking in Progress', description: 'Our chefs are working their magic.' }), 4000);
      setTimeout(() => toast({ title: 'Out for Delivery', description: 'Your order is on its way!' }), 8000);
      setTimeout(() => {
        toast({ title: 'Delivered!', description: 'Enjoy your meal!' });
        setIsReviewDialogOpen(true);
      }, 12000);
    }, 500);
  };
  
  const categories = ['Appetizer', 'Main Course', 'Dessert', 'Beverage'];

  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Script 
      async 
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
    <div className="flex flex-col min-h-screen bg-secondary/20">
      <AppHeader
        onOpenCart={() => setIsCartSheetOpen(true)}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />
      <main className="flex-1 pb-24">
        <div className="container py-8">
          <div className="space-y-8">
            <div className="text-center bg-gray-200 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Advertisement</p>
                {/* This is a placeholder for a Google Ad. */}
                <div className="w-full h-24 bg-gray-300 flex items-center justify-center">
                    <p className="text-gray-500">Google AdSense Unit</p>
                </div>
            </div>
            {categories.map((category, index) => {
              const itemsInCategory = filteredMenuItems.filter(
                (item) => item.category === category
              );
              if (itemsInCategory.length === 0) return null;

              return (
              <React.Fragment key={category}>
                <section>
                  <h2 className="text-3xl font-bold font-headline mb-4">{category}s</h2>
                  <div className="space-y-3">
                    {itemsInCategory.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 bg-card p-3 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md"
                        >
                          <div className="relative h-20 w-20 flex-shrink-0" onClick={() => handleItemClick(item)}>
                              <Image
                                src={item.images[0]}
                                alt={item.name}
                                fill
                                objectFit="cover"
                                className="rounded-full"
                                data-ai-hint="food meal"
                              />
                          </div>

                          <div className="flex-1 min-w-0" onClick={() => handleItemClick(item)}>
                            <p className="font-headline text-base truncate">{item.name}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                  <span>{item.rating}</span>
                                </div>
                                <span>·</span>
                                <p className="font-bold">₹{item.price.toFixed(2)}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 truncate hidden sm:block">{item.description}</p>
                          </div>
                           
                          <div className="flex-shrink-0">
                             <Button 
                                variant="ghost" 
                                size="icon" 
                                className="w-10 h-10 rounded-full group"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToCart(item);
                                }}
                              >
                                <PlusCircle className="w-7 h-7 text-primary transition-transform group-hover:scale-110" />
                              </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </section>
                {index === 1 && (
                   <div className="text-center bg-gray-200 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Advertisement</p>
                      {/* This is a placeholder for a Google Ad. */}
                      <div className="w-full h-24 bg-gray-300 flex items-center justify-center">
                          <p className="text-gray-500">Google AdSense Unit</p>
                      </div>
                  </div>
                )}
              </React.Fragment>
            )})}
          </div>
        </div>
      </main>

      <ItemDetailsSheet
        item={selectedItem}
        isOpen={isItemSheetOpen}
        onOpenChange={(isOpen) => {
          setIsItemSheetOpen(isOpen)
          if (!isOpen) {
             setTimeout(() => setSelectedItem(null), 300);
          }
        }}
        onAddToCart={(item, quantity) => handleAddToCart(item, quantity, true)}
      />

      <CartSheet
        isOpen={isCartSheetOpen}
        onOpenChange={setIsCartSheetOpen}
        onOrderPlaced={handleOrderPlaced}
      />

      <ReviewDialog isOpen={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen} />
      
      <BottomNav onOpenCart={() => setIsCartSheetOpen(true)} />
    </div>
    </>
  );
}
