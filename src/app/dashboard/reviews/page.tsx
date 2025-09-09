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
import { useAppData } from '@/hooks/useAppData';
import { getData } from '@/lib/api';
import type { Review } from '@/lib/types';

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
  const { hotelId } = useAppData();
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (hotelId) {
      const fetchReviews = async () => {
        setLoading(true);
        try {
          const fetchedReviews = await getData(`reviews/hotel/${hotelId}`);
          setReviews(fetchedReviews || []);
        } catch (error) {
          console.error("Failed to fetch reviews:", error);
          setReviews([]);
        } finally {
          setLoading(false);
        }
      };
      fetchReviews();
    } else {
      setLoading(false);
    }
  }, [hotelId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading reviews...</p>
      </div>
    );
  }

  return (
    <div>
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review: any) => (
            <Card key={review.id} className="flex flex-col">
              <CardHeader className="flex flex-row items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={review.avatarUrl} alt={review.author} data-ai-hint="person" />
                  <AvatarFallback>{review.author ? review.author.charAt(0) : 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle>{review.author || 'Anonymous'}</CardTitle>
                  <CardDescription>{review.date ? new Date(review.date).toLocaleDateString() : 'N/A'}</CardDescription>
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
      ) : (
        <div className="flex flex-col items-center justify-center h-64 rounded-lg bg-muted/50">
          <MessageSquare className="w-12 h-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold">No Reviews Found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            This hotel has not received any reviews yet.
          </p>
        </div>
      )}
    </div>
  );
}
