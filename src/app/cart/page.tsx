'use client';

import { useCart } from '@/hooks/useCart';
import CartItem from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { AppLogo } from '@/components/AppLogo';

export default function CartPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="animation-fade-in flex flex-col h-full">
       <header className="p-4 border-b flex items-center justify-center text-center relative">
          <AppLogo className="w-8 h-8 text-primary" />
          <h1 className="font-headline text-2xl text-primary ml-2">Your Order</h1>
      </header>

      {cartItems.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
          <ShoppingCart className="w-24 h-24 text-muted-foreground/20 mb-4" />
          <h2 className="text-xl font-bold font-headline">Your Cart is Empty</h2>
          <p className="text-muted-foreground mt-2 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild>
            <Link href="/menu">Start Ordering</Link>
          </Button>
        </div>
      ) : (
        <div className="flex-grow overflow-y-auto p-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
              <Separator />
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">₹{cartTotal.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 p-4">
              <Button size="lg" className="w-full" onClick={handleCheckout}>
                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full" onClick={clearCart}>
                Clear Cart
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
