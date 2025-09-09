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
    case 'Completed':
      return 'default';
    case 'Preparing':
      return 'secondary';
    case 'Pending':
      return 'outline';
    case 'Cancelled':
      return 'destructive';
    default:
      return 'outline';
  }
}

export default function OrdersPage() {
  const [orderData, setOrderData] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { hotelId } = useAppData();

  // ---- Fetch orders from API ----
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getData(`hotel/${hotelId}/orders`); // ✅ adjust endpoint to match your backend
      setOrderData(response || []);
    } catch (err) {
      console.error('Error fetching orders', err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000); // auto-refresh every 10s
    return () => clearInterval(interval);
  }, []);

  // ---- Update order status via API ----
  const handleStatusUpdate = async (orderId: string, value: number[]) => {
    if (value[0] === 100) {
      try {
        const updated = await putData(`hotel/${hotelId}/orders/${orderId}`, {
          status: 'Completed',
        });
        setOrderData(prev =>
          prev.map(order =>
            order.id === orderId ? { ...order, status: 'Completed' } : order
          )
        );
      } catch (err) {
        console.error('Error updating order status', err);
      }
    }
  };

  // ---- Print Bill ----
  const handlePrint = (order: Order) => {
    const printContent = `
      <div>
        <h2>Bill Receipt</h2>
        <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>Table:</strong> ${order.table}</p>
        <hr/>
        <ul>
          ${order.items
            .map(
              (item) =>
                `<li>${item.quantity}x ${item.name} - ₹${(
                  item.quantity * item.price
                ).toFixed(2)}</li>`
            )
            .join('')}
        </ul>
        <hr/>
        <p><strong>Total:</strong> ₹${order.total.toFixed(2)}</p>
      </div>
    `;
    const printWindow = window.open('', '', 'width=600,height=800');
    if (printWindow) {
      printWindow.document.write(
        `<html><head><title>Bill</title></head><body>${printContent}</body></html>`
      );
      printWindow.document.close();
      printWindow.print();
    }
  };

  const orderStatuses: Order['status'][] = [
    'Pending',
    'Preparing',
    'Completed',
    'Cancelled',
  ];

  const ordersByStatus = (status: Order['status']) =>
    orderData.filter((o) => o.status === status);

  return (
    <div className="flex flex-col gap-4">
      <Tabs defaultValue="Pending">
        <TabsList className="grid w-full grid-cols-4">
          {orderStatuses.map((status) => (
            <TabsTrigger key={status} value={status}>
              {status}
            </TabsTrigger>
          ))}
        </TabsList>

        {orderStatuses.map((status) => (
          <TabsContent key={status} value={status}>
            {loading ? (
              <p className="text-muted-foreground text-center mt-8">
                Loading orders...
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                {ordersByStatus(status).length > 0 ? (
                  ordersByStatus(status).map((order) => (
                    <Card key={order.id} className="flex flex-col">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between font-headline">
                          <span>Table {order.table}</span>
                          <Badge variant={getStatusBadgeVariant(order.status)}>
                            {order.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription>{order.id}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 space-y-2">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between text-sm"
                          >
                            <span>
                              {item.quantity}x {item.name}
                            </span>
                            <span>
                              ₹{(item.quantity * item.price).toFixed(2)}
                            </span>
                          </div>
                        ))}
                        <Separator className="my-2" />
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>₹{order.total.toFixed(2)}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex-col items-start gap-2 pt-4">
                        {order.status === 'Preparing' && (
                          <>
                            <Label className="text-xs text-muted-foreground">
                              Slide to mark as completed
                            </Label>
                            <Slider
                              defaultValue={[0]}
                              max={100}
                              step={1}
                              onValueChange={(value) =>
                                handleStatusUpdate(order.id, value)
                              }
                            />
                          </>
                        )}
                        {order.status === 'Completed' && (
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => handlePrint(order)}
                          >
                            Print Bill
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground col-span-full text-center mt-8">
                    No {status.toLowerCase()} orders.
                  </p>
                )}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
