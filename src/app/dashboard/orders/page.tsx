'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { orders } from '@/lib/data';
import type { Order } from '@/types';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import type { Order } from '@/types';
import { getData, postData, putData } from '@/lib/api';
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
  const [orderData, setOrderData] = React.useState<Order[]>(orders);

  const handleStatusUpdate = (orderId: string, value: number[]) => {
    if (value[0] === 100) {
      setOrderData(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: 'Completed' } : order
        )
      );
    }
  };
  
  const orderStatuses: Order['status'][] = ['Pending', 'Preparing', 'Completed', 'Cancelled'];

  const ordersByStatus = (status: Order['status']) =>
    orderData.filter((o) => o.status === status);

  return (
    <div className="flex flex-col gap-4">
      <Tabs defaultValue="PENDING">
        <TabsList className="grid w-full grid-cols-4">
          {orderStatuses.map((status) => (
            <TabsTrigger key={status} value={status}>
              {status}
            </TabsTrigger>
          ))}
        </TabsList>

        {orderStatuses.map(status => (
            <TabsContent key={status} value={status}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                    {ordersByStatus(status).length > 0 ? ordersByStatus(status).map(order => (
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
                            {order.status === 'Preparing' && (
                                <CardFooter className="flex-col items-start gap-2 pt-4">
                                  <Label className="text-xs text-muted-foreground">Slide to mark as completed</Label>
                                  <Slider
                                    defaultValue={[0]}
                                    max={100}
                                    step={1}
                                    onValueChange={(value) => handleStatusUpdate(order.id, value)}
                                  />
                                </CardFooter>
                            )}
                        </Card>
                    )) : (
                        <p className="text-muted-foreground col-span-full text-center mt-8">No {status.toLowerCase()} orders.</p>
                    )}
                </div>
            </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
