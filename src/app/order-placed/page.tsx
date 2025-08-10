'use client';

import { useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Download } from 'lucide-react';

export default function OrderPlacedPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear the cart when the user reaches this page
    clearCart();
  }, [clearCart]);

  return (
    <div className="animation-fade-in flex flex-col items-center justify-center text-center p-8 h-full">
      <CheckCircle2 className="w-24 h-24 text-green-500 mb-6" />
      <h1 className="text-3xl font-headline text-primary mb-2">Order Placed Successfully!</h1>
      <p className="text-muted-foreground mb-8">Thank you for your order. Your food is being prepared.</p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button asChild size="lg">
          <Link href="/bill">
            <Download className="mr-2 h-5 w-5" />
            Download Bill
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/menu">Order More</Link>
        </Button>
      </div>
    </div>
  );
}
