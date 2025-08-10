'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Download, ChefHat } from 'lucide-react';
import type { Order } from '@/lib/types';

export default function OrderPlacedPage() {
  const { clearCart } = useCart();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      setOrder(JSON.parse(lastOrder));
    }
    // Clear the cart when the user reaches this page
    clearCart();
  }, [clearCart]);

  return (
    <div className="animation-fade-in flex flex-col items-center justify-center text-center p-8 h-full">
      <div className="relative">
        <CheckCircle2 className="w-24 h-24 text-green-500 mb-6" />
        <ChefHat className="w-10 h-10 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+12px)]" />
      </div>

      <h1 className="text-3xl font-headline text-primary mb-2">Order Placed!</h1>
      {order && <p className="text-xl font-bold mb-2">Order #{order.orderNumber}</p>}
      <p className="text-muted-foreground mb-8 max-w-sm">
        Thank you, {order?.customerName || 'guest'}. Your delicious meal is now being prepared by our chefs.
      </p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button asChild size="lg">
          <Link href="/bill">
            <Download className="mr-2 h-5 w-5" />
            View Bill
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/menu">Order More</Link>
        </Button>
      </div>
    </div>
  );
}
