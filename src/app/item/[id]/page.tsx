'use client';

import { useMenu } from '@/hooks/useMenu';
import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlusCircle, Star, MessageSquare } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AppContainer from '@/components/AppContainer';
import BottomNav from '@/components/BottomNav';
import { notFound } from 'next/navigation';

export default function MenuItemDetailPage({ params }: { params: { id: string } }) {
  const { getMenuItem } = useMenu();
  const { addToCart } = useCart();
  const item = getMenuItem(params.id);

  if (!item) {
    notFound();
  }

  const reviews = item.reviews || [
      { id: '1', author: 'Priya S.', rating: 5, comment: 'Absolutely delicious! The best pizza I have had in a long time. Highly recommend.', date: '2023-10-26' },
      { id: '2', author: 'Rahul K.', rating: 4, comment: 'Very good, but a bit spicy for my taste. The quality of ingredients was excellent.', date: '2023-10-24' }
  ];

  return (
    <AppContainer>
        <main className="flex-grow overflow-y-auto pb-20">
            <div className="animation-fade-in">
                <Carousel className="w-full">
                <CarouselContent>
                    {Array.from({ length: 3 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <div className="aspect-square relative">
                        <Image
                            src={`${item.imageUrl}&random=${index}`}
                            alt={item.name}
                            layout="fill"
                            objectFit="cover"
                            data-ai-hint={item['data-ai-hint']}
                        />
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
                </Carousel>

                <div className="p-4 space-y-4">
                    <h1 className="font-headline text-3xl font-bold">{item.name}</h1>
                    <p className="text-2xl font-bold text-primary">₹{item.price.toFixed(2)}</p>
                    <p className="text-muted-foreground">{item.description}</p>
                    
                    <Button size="lg" className="w-full" onClick={() => addToCart(item)}>
                        <PlusCircle className="mr-2 h-5 w-5" />
                        Add to Cart
                    </Button>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                                Customer Reviews
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {reviews.map(review => (
                                <div key={review.id} className="flex space-x-3">
                                    <Avatar>
                                        <AvatarImage src={`https://i.pravatar.cc/40?u=${review.author}`} />
                                        <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold">{review.author}</p>
                                            <div className="flex items-center">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                ))}
                                                {[...Array(5 - review.rating)].map((_, i) => (
                                                    <Star key={i} className="w-4 h-4 text-gray-300" />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
        <BottomNav />
    </AppContainer>
  );
}
