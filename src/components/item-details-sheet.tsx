
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Star, X, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
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
    <Dialog open={isOpen} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) {
        setTimeout(() => setQuantity(1), 300); // Reset quantity after animation
      }
    }}>
      <DialogContent className="max-w-full w-full h-full p-0 flex flex-col gap-0 md:max-w-4xl md:h-[90vh] md:rounded-lg">
        <div className="p-4 flex items-center justify-between md:hidden sticky top-0 bg-background/80 backdrop-blur-sm z-10 border-b">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => onOpenChange(false)}>
              <ArrowLeft className="w-5 h-5"/>
            </Button>
            <h2 className="font-headline text-lg truncate flex-1 text-center">{item.name}</h2>
             <Button variant="ghost" size="icon" className="rounded-full invisible">
              <ArrowLeft className="w-5 h-5"/>
            </Button>
        </div>

        <DialogTitle className="sr-only">{item.name}</DialogTitle>
        <Button variant="ghost" size="icon" className="absolute top-3 right-3 z-20 rounded-full bg-background/70 hover:bg-background hidden md:flex" onClick={() => onOpenChange(false)}>
          <X className="w-5 h-5"/>
        </Button>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 min-h-0">
          <div className="relative h-full w-full min-h-64 md:min-h-0">
            <Carousel className="w-full h-full">
              <CarouselContent className="h-full">
                {item.images.map((img, index) => (
                  <CarouselItem key={index} className="h-full">
                    <div className="relative h-full w-full">
                      <Image src={img} alt={`${item.name} image ${index + 1}`} layout="fill" objectFit="cover" data-ai-hint="food meal" className="md:rounded-l-lg"/>
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
          </div>
          
          <div className="flex flex-col relative">
            <ScrollArea className="flex-1">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 text-muted-foreground pt-2">
                  <Badge>{item.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-semibold">{item.rating}</span>
                    <span>({item.reviewCount} reviews)</span>
                  </div>
                </div>
                <h1 className="font-headline text-3xl md:text-4xl mt-4">{item.name}</h1>
                <p className="mt-4 text-lg font-body">{item.description}</p>
              
                {item.reviews.length > 0 && (
                  <div className="mt-8">
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
            <div className="p-4 md:p-6 bg-background/80 backdrop-blur-sm border-t mt-auto">
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
                    Add to Cart - ₹{(item.price * quantity).toFixed(2)}
                 </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
