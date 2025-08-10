'use client';

import { useEffect, useState } from 'react';
import type { Order } from '@/lib/types';
import { Button } from '@/components/ui/button';
import AppContainer from '@/components/AppContainer';
import { Printer } from 'lucide-react';

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
      <AppContainer className="flex items-center justify-center">
        <p>No order found.</p>
      </AppContainer>
    );
  }

  return (
    <AppContainer className="bg-white">
      <div className="p-6 animation-fade-in" id="bill-content">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-headline font-bold">QR Menu Go</h1>
          <p className="text-sm text-muted-foreground">Thank you for your order!</p>
        </div>

        <div className="mb-4">
          <h2 className="font-bold border-b-2 border-dashed pb-1">Order Details</h2>
          <div className="text-sm mt-2 space-y-1">
            <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
          </div>
        </div>

        <table className="w-full text-sm mb-4">
          <thead>
            <tr className="border-b-2 border-dashed">
              <th className="text-left py-2">Item</th>
              <th className="text-center py-2">Qty</th>
              <th className="text-right py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map(item => (
              <tr key={item.id} className="border-b border-dashed">
                <td className="py-2">{item.name}</td>
                <td className="text-center py-2">{item.quantity}</td>
                <td className="text-right py-2">${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <div className="text-right">
            <p className="font-bold text-lg">Total: <span className="text-primary">${order.total.toFixed(2)}</span></p>
          </div>
        </div>
      </div>
      <div className="p-4 mt-auto border-t bg-background">
        <Button onClick={handlePrint} className="w-full" size="lg">
          <Printer className="mr-2 h-5 w-5" />
          Print Bill
        </Button>
      </div>
    </AppContainer>
  );
}
