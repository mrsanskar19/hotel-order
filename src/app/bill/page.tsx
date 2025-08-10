'use client';

import { useEffect, useState } from 'react';
import type { Order } from '@/lib/types';
import { Button } from '@/components/ui/button';
import AppContainer from '@/components/AppContainer';
import { Printer } from 'lucide-react';
import { AppLogo } from '@/components/AppLogo';

export default function BillPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      setOrder(JSON.parse(lastOrder));
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <AppContainer className="flex items-center justify-center p-4">
        <div className="text-center animation-fade-in">
          <h2 className="text-xl font-headline">No recent order found.</h2>
          <p className="text-muted-foreground">Please place an order to see your bill.</p>
        </div>
      </AppContainer>
    );
  }

  return (
    <AppContainer className="bg-white">
      <main className="p-6 animation-fade-in flex-grow" id="bill-content">
        <div className="text-center mb-8">
          <AppLogo className="mx-auto h-10 w-10 text-primary" />
          <h1 className="text-3xl font-headline font-bold mt-2">The Grand Hotel</h1>
          <p className="text-sm text-muted-foreground">Thank you for your patronage!</p>
        </div>

        <div className="mb-6">
          <h2 className="font-bold text-lg border-b-2 border-dashed pb-2">Order Summary</h2>
          <div className="text-sm mt-3 space-y-1">
            <p><strong>Order Number:</strong> {order.orderNumber}</p>
            <p><strong>Customer:</strong> {order.customerName}</p>
            <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
          </div>
        </div>

        <table className="w-full text-sm mb-6">
          <thead>
            <tr className="border-b-2 border-dashed">
              <th className="text-left py-2 font-semibold">Item</th>
              <th className="text-center py-2 font-semibold">Qty</th>
              <th className="text-right py-2 font-semibold">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map(item => (
              <tr key={item.id} className="border-b border-dashed">
                <td className="py-2">{item.name}</td>
                <td className="text-center py-2">{item.quantity}</td>
                <td className="text-right py-2">₹{(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-6">
          <div className="text-right">
            <p className="text-muted-foreground">Subtotal: ₹{order.total.toFixed(2)}</p>
            <p className="text-muted-foreground">Taxes & Fees (10%): ₹{(order.total * 0.1).toFixed(2)}</p>
            <p className="font-bold text-xl mt-1">Total: <span className="text-primary">₹{(order.total * 1.1).toFixed(2)}</span></p>
          </div>
        </div>
      </main>
      <footer className="p-4 mt-auto border-t bg-background sticky bottom-0">
        <Button onClick={handlePrint} className="w-full" size="lg">
          <Printer className="mr-2 h-5 w-5" />
          Print Bill
        </Button>
      </footer>
    </AppContainer>
  );
}
