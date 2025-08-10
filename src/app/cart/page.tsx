'use client';

import { useCart } from '@/hooks/useCart';
import CartItem from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const handlePlaceOrder = () => {
    // In a real app, you'd send this to a server.
    // Here we'll save it to localStorage for the bill page.
    const order = {
      items: cartItems,
      total: cartTotal,
      orderDate: new Date().toISOString(),
    };
    localStorage.setItem('lastOrder', JSON.stringify(order));
    router.push('/order-placed');
  };

  return (
    <div className="animation-fade-in flex flex-col h-full">
      <header className="p-4 border-b">
        <h1 className="font-headline text-2xl text-primary text-center">Your Order</h1>
      </header>

      {cartItems.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
          <ShoppingCart className="w-24 h-24 text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-bold font-headline">Your Cart is Empty</h2>
          <p className="text-muted-foreground mt-2">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild className="mt-6">
            <Link href="/menu">Start Ordering</Link>
          </Button>
        </div>
      ) : (
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          <Card>
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
                <span className="text-primary">${cartTotal.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button size="lg" className="w-full" onClick={handlePlaceOrder}>
                Place Order
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
