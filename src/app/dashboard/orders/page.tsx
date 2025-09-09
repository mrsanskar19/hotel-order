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
import { getData, putData } from '@/lib/api';
import type { Order } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

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
  const hotelId = 1; // Assuming a default hotel ID

  const fetchOrders = React.useCallback(async () => {
    try {
      const data = await getData(`/hotel/${hotelId}/orders`);
      setOrderData(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }, [hotelId]);

  React.useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleStatusUpdate = async (orderId: number, status: Order['status']) => {
    try {
      await putData(`/hotel/${hotelId}/orders/${orderId}`, { status });
      fetchOrders(); // Refresh the orders list
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
  
  const orderStatuses: Order['status'][] = ['PENDING', 'PREPARING', 'DELIVERED', 'CANCELLED'];

  const ordersByStatus = (status: Order['status']) => orderData.filter(o => o.status === status);

  return (
    <div className="flex flex-col gap-4">
      <Tabs defaultValue="PENDING">
        <TabsList className="grid w-full grid-cols-4">
          {orderStatuses.map(status => (
             <TabsTrigger key={status} value={status}>{status}</TabsTrigger>
          ))}
        </TabsList>

        {orderStatuses.map(status => (
            <TabsContent key={status} value={status}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                    {ordersByStatus(status).length > 0 ? ordersByStatus(status).map(order => (
                        <Card key={order.order_id} className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between font-headline">
                                    <span>Table {order.table_id}</span>
                                    <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                                </CardTitle>
                                <CardDescription>{order.order_id}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-2">
                                {order.items.map(item => (
                                    <div key={item.item_id} className="flex justify-between text-sm">
                                        <span>{item.quantity}x {item.item.name}</span>
                                        <span>${(item.quantity * item.price).toFixed(2)}</span>
                                    </div>
                                ))}
                                <Separator className="my-2"/>
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>${order.total_amount.toFixed(2)}</span>
                                </div>
                            </CardContent>
                            {order.status === 'PREPARING' && (
                                <CardFooter className="flex-col items-start gap-2 pt-4">
                                  <Label className="text-xs text-muted-foreground">Slide to mark as delivered</Label>
                                  <Slider
                                    defaultValue={[0]}
                                    max={100}
                                    step={1}
                                    onValueChange={(value) => {
                                      if (value[0] === 100) {
                                        handleStatusUpdate(order.order_id, 'DELIVERED');
                                      }
                                    }}
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
