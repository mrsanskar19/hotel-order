'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Order } from '@/types';
import { Separator } from '@/components/ui/separator';
import { getData } from '@/lib/api';
import { useAppData } from '@/hooks/useAppData';

function getStatusBadgeVariant(
  status: Order['status']
): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'DELIVERED':
      return 'default';
    case 'PREPARING':
      return 'secondary';
    case 'PENDING':
      return 'outline';
    case 'CANCELLED':
      return 'destructive';
    default:
      return 'outline';
  }
}

export default function OrdersPage() {
  const [orderData, setOrderData] = React.useState<Order[]>([]);
  const { hotelIdAdmin } = useAppData();

  React.useEffect(() => {
    if (hotelIdAdmin) {
      getData(`orders/hotel/${hotelIdAdmin}`).then(response => {
        setOrderData(response.data);
      });
    }
  }, [hotelIdAdmin]);

  const completedOrders = orderData.filter((o) => o.status === 'DELIVERED');

  return (
    <div className="flex flex-col gap-4">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Completed Orders</CardTitle>
                <CardDescription>
                An overview of all completed orders.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                    {completedOrders.length > 0 ? completedOrders.map(order => (
                        <Card key={order.id} className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between font-headline">
                                    <span>Table {order.table}</span>
                                    <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                                </CardTitle>
                                <CardDescription>{order.id}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-2">
                                {order.items.map(item => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span>{item.quantity}x {item.name}</span>
                                        <span>${(item.quantity * item.price).toFixed(2)}</span>
                                    </div>
                                ))}
                                <Separator className="my-2"/>
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>${order.total.toFixed(2)}</span>
                                </div>
                            </CardContent>
                        </Card>
                    )) : (
                        <p className="text-muted-foreground col-span-full text-center mt-8">No completed orders.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
