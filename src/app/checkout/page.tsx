'use client';

import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreditCard, User } from 'lucide-react';
import AppContainer from '@/components/AppContainer';
import BottomNav from '@/components/BottomNav';
import type { OrderStatus } from '@/lib/types';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  roomNumber: z.string().min(1, { message: 'Room number is required.' }),
});

type CheckoutFormValues = z.infer<typeof formSchema>;

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();
  const router = useRouter();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      roomNumber: '',
    },
  });

  const handlePlaceOrder = (values: CheckoutFormValues) => {
    const orderNumber = `GH${Math.floor(Math.random() * 9000) + 1000}`;
    const orderStatus: OrderStatus = {
        orderNumber,
        status: 'Confirmed',
        estimatedDeliveryTime: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    };
    
    const order = {
      items: cartItems,
      total: cartTotal,
      orderDate: new Date().toISOString(),
      orderNumber,
      customerName: values.name,
      roomNumber: values.roomNumber,
      status: orderStatus.status,
    };
    // Store with a unique key for history
    localStorage.setItem(`order_${orderNumber}`, JSON.stringify(order));
    // Also store as last order for quick access
    localStorage.setItem('lastOrder', JSON.stringify(order));
    localStorage.setItem(`orderStatus_${orderNumber}`, JSON.stringify(orderStatus));

    router.push('/order-placed');
  };

  if (cartItems.length === 0) {
    // Redirect to menu if cart is empty, maybe show a message
    router.replace('/menu');
    return null;
  }

  return (
    <AppContainer>
      <main className="flex-grow overflow-y-auto p-4 animation-fade-in">
         <header className="p-4 border-b text-center">
            <h1 className="font-headline text-2xl text-primary">Checkout</h1>
        </header>
        <Card className="my-4 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center"><User className="mr-2 h-5 w-5 text-primary" /> Customer Details</CardTitle>
            <CardDescription>Please provide your details to complete the order.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handlePlaceOrder)} id="checkout-form" className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="roomNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 204" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center"><CreditCard className="mr-2 h-5 w-5 text-primary"/> Payment</CardTitle>
                <CardDescription>Your order will be charged to your room.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">₹{cartTotal.toFixed(2)}</span>
                </div>
            </CardContent>
        </Card>
      </main>
       <div className="p-4 border-t bg-background sticky bottom-16">
          <Button size="lg" className="w-full" type="submit" form="checkout-form">
            Place Order
          </Button>
        </div>
      <BottomNav />
    </AppContainer>
  );
}
