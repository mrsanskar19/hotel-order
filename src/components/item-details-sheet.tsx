
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, Plus, Minus } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import type { MenuItem } from '@/lib/types';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from './ui/button';

interface ItemDetailsSheetProps {
  item: MenuItem | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAddToCart: (item: MenuItem, quantity: number) => void;
}

export function ItemDetailsSheet({ item, isOpen, onOpenChange, onAddToCart }: ItemDetailsSheetProps) {
  const [quantity, setQuantity] = useState(1);
  
  const handleConfirmAddToCart = () => {
    if (!item) return;
    onAddToCart(item, quantity);
  };

  if (!item) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) {
        setQuantity(1); // Reset quantity on close
      }
    }}>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col h-full data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom">
         <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-2 bg-gradient-to-b from-black/50 to-transparent">
            <Button variant="ghost" size="icon" className="rounded-full bg-background/70 hover:bg-background" onClick={() => onOpenChange(false)}>
                <ChevronLeft />
            </Button>
            <h2 className="text-lg font-headline text-white text-shadow-lg truncate max-w-[calc(100%-100px)]">{item.name}</h2>
            <div className="w-10"></div>
        </div>

        <ScrollArea className="flex-1">
          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                {item.images.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-96 w-full">
                      <Image src={img} alt={`${item.name} image ${index + 1}`} layout="fill" objectFit="cover" data-ai-hint="food meal" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {item.images.length > 1 && (
                <>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </>
              )}
            </Carousel>
             <div className="absolute bottom-4 right-4 bg-background/80 rounded-full p-1 shadow-lg">
              <Badge variant="secondary" className="text-lg font-bold">
                ₹{item.price.toFixed(2)}
              </Badge>
            </div>
          </div>
          
          <div className="p-6 pb-32">
            <SheetHeader className="text-left">
              <SheetTitle className="font-headline text-3xl">{item.name}</SheetTitle>
              <div className="flex items-center gap-4 text-muted-foreground pt-2">
                <Badge>{item.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-semibold">{item.rating}</span>
                  <span>({item.reviewCount} reviews)</span>
                </div>
              </div>
              <SheetDescription className="pt-4 text-base font-body">{item.description}</SheetDescription>
            </SheetHeader>

            {item.reviews.length > 0 && (
              <div className="mt-6">
                <h3 className="font-headline text-xl mb-4">Reviews</h3>
                <div className="space-y-4">
                  {item.reviews.map((review, index) =>( 
                    <div key={index} className="flex gap-3 bg-secondary/30 p-4 rounded-lg">
                      <Avatar>
                        <AvatarImage src={review.avatar} alt={review.user} data-ai-hint="person face" />
                        <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                           <p className="font-semibold">{review.user}</p>
                           <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`} />
                              ))}
                           </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t">
          <div className="flex items-center justify-between gap-4">
             <div className="flex items-center gap-2">
                <Button size="icon" variant="outline" className="h-12 w-12 rounded-full" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                  <Minus className="h-6 w-6" />
                </Button>
                <span className="w-10 text-center font-bold text-xl">{quantity}</span>
                <Button size="icon" variant="outline" className="h-12 w-12 rounded-full" onClick={() => setQuantity(q => q + 1)}>
                  <Plus className="h-6 w-6" />
                </Button>
              </div>
              <Button className="flex-1 h-12 text-base" onClick={handleConfirmAddToCart}>
                Add to Cart
              </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
