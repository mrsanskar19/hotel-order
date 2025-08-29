'use client';

import * as React from 'react';
import {
  MessageSquare,
  Star,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { reviews } from '@/lib/data';
import type { Review } from '@/types';


function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <Card key={review.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-start gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={review.avatarUrl} alt={review.author} data-ai-hint="person" />
                <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle>{review.author}</CardTitle>
                <CardDescription>{review.date}</CardDescription>
              </div>
              <StarRating rating={review.rating} />
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground">{review.text}</p>
            </CardContent>
            <CardFooter>
               <Button
                  variant="outline"
                  className="w-full"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Respond
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
  );
}
