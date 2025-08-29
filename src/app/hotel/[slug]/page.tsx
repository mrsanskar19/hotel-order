
'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Star, PlusCircle, Settings2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { menuItems } from '@/data/menu';
import type { MenuItem } from '@/lib/types';
import { useCart } from '@/hooks/use-cart';

import { ItemDetailsSheet } from '@/components/item-details-sheet';
import { CartSheet } from '@/components/cart-sheet';
import { ReviewDialog } from '@/components/review-dialog';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/bottom-nav';
import { AppSidebar } from '@/components/app-sidebar';
import { AppHeader } from '@/components/app-header';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isItemSheetOpen, setIsItemSheetOpen] = useState(false);
  const [isCartSheetOpen, setIsCartSheetOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const router = useRouter();

  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleItemClick = (item: MenuItem) => {
    if (!item.available) return;
    setSelectedItem(item);
    setIsItemSheetOpen(true);
  };

  const handleAddToCart = (item: MenuItem, quantity: number = 1, fromSheet: boolean = false) => {
    addToCart(item, quantity);
    if(fromSheet) {
      setIsItemSheetOpen(false);
    }
    toast({
      variant: 'success',
      title: "Added to cart!",
      description: `${quantity} x ${item.name} is waiting for you.`,
      duration: 3000
    });
    if(fromSheet) {
      setTimeout(() => setSelectedItem(null), 300);
    }
  };

  const handleOrderPlaced = () => {
    toast({ 
      title: 'Order Placed!', 
      description: "Your order is now active. Click to view.",
      duration: 5000,
      onClick: () => router.push('/orders') 
    });
  };
  
  const categories = ['All', 'Appetizer', 'Main Course', 'Dessert', 'Beverage'];

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || item.category === selectedCategory)
    );
  }, [searchTerm, selectedCategory]);

  return (
    <>
    <div className="flex min-h-screen bg-secondary/20">
      <AppSidebar 
        onOpenCart={() => setIsCartSheetOpen(true)}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />
      <div className="flex flex-col flex-1 w-full md:ml-[250px]">
        <AppHeader onOpenCart={() => setIsCartSheetOpen(true)} searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
        <main className="flex-1 pb-24 md:pb-0">
          <div className="container py-8">
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold font-headline mb-4">Categories</h2>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <section>
                <h2 className="text-3xl font-bold font-headline mb-4">Menu</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredMenuItems.map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          "flex items-start gap-4 bg-card p-3 rounded-lg shadow-sm transition-all duration-300",
                          item.available ? "hover:shadow-md cursor-pointer" : "opacity-60 cursor-not-allowed"
                        )}
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="relative h-20 w-20 flex-shrink-0">
                            <Image
                              src={item.images[0]}
                              alt={item.name}
                              fill
                              style={{objectFit:"cover"}}
                              className={cn("rounded-full", !item.available && "grayscale")}
                              data-ai-hint="food meal"
                            />
                             {!item.available && (
                                <Badge variant="destructive" className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4">Unavailable</Badge>
                             )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-headline text-base truncate">{item.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1 flex-wrap">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                <span>{item.rating}</span>
                              </div>
                              <span>·</span>
                              <p className="font-bold">₹{item.price.toFixed(2)}</p>
                              {item.customizable && (
                                <>
                                  <span>·</span>
                                  <div className="flex items-center gap-1 text-blue-500">
                                      <Settings2 className="w-3 h-3" />
                                      <span>Customizable</span>
                                  </div>
                                </>
                              )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 truncate hidden sm:block">{item.description}</p>
                        </div>
                        
                        <div className="flex-shrink-0 self-center">
                          <Button 
                              variant="ghost" 
                              size="icon" 
                              className="w-10 h-10 rounded-full group bg-green-500/10 hover:bg-green-500/20 disabled:bg-muted disabled:pointer-events-none"
                              disabled={!item.available}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(item);
                              }}
                            >
                              <PlusCircle className="w-7 h-7 text-green-500 transition-transform group-hover:scale-110" />
                            </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>

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
