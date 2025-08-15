
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useOrders } from '@/hooks/use-orders';
import { AppHeader } from '@/components/app-header';
import { BottomNav } from '@/components/bottom-nav';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SlideToConfirm } from '@/components/slide-to-confirm';
import { Receipt, CreditCard, Landmark, CircleDot, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

export default function OrdersPage() {
  const { orders, closeOrder } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [sliderStates, setSliderStates] = useState<{ [key: string]: { isLoading: boolean; isSuccess: boolean } }>({});
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [orderToClose, setOrderToClose] = useState<string | null>(null);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const handleSlideConfirm = (orderId: string) => {
    setOrderToClose(orderId);
    setPaymentDialogOpen(true);
  };

  const handlePayment = () => {
    if (!orderToClose) return;

    setPaymentDialogOpen(false);
    setSliderStates(prev => ({ ...prev, [orderToClose]: { isLoading: true, isSuccess: false } }));
    
    // Simulate API call for closing order
    setTimeout(() => {
      setSliderStates(prev => ({ ...prev, [orderToClose]: { isLoading: false, isSuccess: true } }));
      toast({ title: 'Payment Successful!', description: 'Your order has been closed.' });
      
      setTimeout(() => {
        closeOrder(orderToClose);
        setSliderStates(prev => {
          const newStates = { ...prev };
          delete newStates[orderToClose];
          return newStates;
        });
        setOrderToClose(null);
      }, 1500);
    }, 1000);
  };

  const activeOrder = orders.find(o => o.status === 'Active');

  const renderContent = () => {
    if (!isClient) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-muted-foreground gap-4 py-20">
          <Loader2 className="w-20 h-20 text-muted-foreground/50 animate-spin"/>
          <p className="text-lg font-semibold">Loading Orders...</p>
        </div>
      );
    }
    
    if (activeOrder) {
      return (
        <Card key={activeOrder.id} className="overflow-hidden">
          <CardHeader className="flex-row justify-between items-center bg-muted/50 p-4">
            <div>
              <CardTitle className="text-lg font-headline">Order #{activeOrder.id.substring(0, 6)}</CardTitle>
              <p className="text-sm text-muted-foreground">{format(new Date(activeOrder.date), "PPP p")}</p>
            </div>
            <Badge variant={activeOrder.status === 'Active' ? 'destructive' : 'secondary'}>{activeOrder.status}</Badge>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {activeOrder.items.map(item => {
                const imageUrl = (item.images && item.images.length > 0) ? item.images[0] : 'https://placehold.co/48x48.png';
                return (
                  <div key={item.id} className="flex items-center gap-4">
                    <Image src={imageUrl} alt={item.name} width={48} height={48} className="rounded-full object-cover" data-ai-hint="food meal"/>
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4 bg-muted/50 p-4">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span>₹{activeOrder.total.toFixed(2)}</span>
              </div>
            <SlideToConfirm 
              onConfirm={() => handleSlideConfirm(activeOrder.id)}
              isLoading={sliderStates[activeOrder.id]?.isLoading || false}
              isSuccess={sliderStates[activeOrder.id]?.isSuccess || false}
              text="Slide to Close Order & Pay"
              successText="Order Closed!"
            />
          </CardFooter>
        </Card>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center text-center text-muted-foreground gap-4 py-20">
        <Receipt className="w-20 h-20 text-muted-foreground/50"/>
        <p className="text-lg font-semibold">No active orders</p>
        <p>Place an order to see it here.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-secondary/20">
        <AppHeader
          onOpenCart={() => {}}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
        />
        <main className="flex-1 pb-24">
          <div className="container py-8">
            <h1 className="text-3xl font-bold font-headline mb-6">Your Order</h1>
            {renderContent()}
          </div>
        </main>
        <BottomNav onOpenCart={() => {}} />
      </div>

      <AlertDialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Complete Your Payment</AlertDialogTitle>
            <AlertDialogDescription>
              Choose your preferred payment method to close the order.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
              <Button variant="outline" className="w-full justify-start h-14 text-base">
                <CircleDot className="w-6 h-6 text-primary mr-4"/>
                <span className="font-semibold">UPI</span>
              </Button>
              <Button variant="outline" className="w-full justify-start h-14 text-base">
                <CreditCard className="w-6 h-6 text-primary mr-4"/>
                <span className="font-semibold">Credit/Debit Card</span>
              </Button>
               <Button variant="outline" className="w-full justify-start h-14 text-base">
                <Landmark className="w-6 h-6 text-primary mr-4"/>
                <span className="font-semibold">Net Banking</span>
              </Button>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handlePayment}>Pay ₹{activeOrder?.total.toFixed(2)}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
