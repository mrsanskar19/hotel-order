'use client';
import { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ReviewDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function ReviewDialog({ isOpen, onOpenChange }: ReviewDialogProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onOpenChange(false);
      toast({ title: 'Thank You!', description: 'Your feedback helps us improve.' });
      setTimeout(() => {
        setSubmitted(false);
        setRating(0);
        setComment('');
      }, 500);
    }, 2000);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        {submitted ? (
          <div className="flex flex-col items-center justify-center text-center p-8 gap-4 min-h-[300px]">
             <ThumbsUp className="w-16 h-16 text-green-500"/>
             <DialogTitle className="font-headline text-2xl">Feedback Submitted!</DialogTitle>
             <p className="text-muted-foreground">Thank you for helping us improve.</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl">How was everything?</DialogTitle>
              <DialogDescription>
                We'd love to hear your feedback on your order.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div>
                <p className="font-semibold mb-2">Your Rating</p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "w-8 h-8 cursor-pointer transition-all duration-200 hover:scale-110",
                        star <= rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30 hover:text-muted-foreground/60'
                      )}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold mb-2">Comments (optional)</p>
                <Textarea 
                  placeholder="Tell us more about your experience..." 
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit} className="w-full" disabled={rating === 0}>Submit Review</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
