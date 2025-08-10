'use client';
import { useEffect, useState } from 'react';
import type { Order } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const allOrders = Object.keys(localStorage)
        .filter(key => key.startsWith('order_'))
        .map(key => JSON.parse(localStorage.getItem(key) as string))
        .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
      setOrders(allOrders);
    } catch (error) {
      console.error("Failed to parse orders from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <p>Loading order history...</p>
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>A list of all past orders placed by customers.</CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No orders have been placed yet.</p>
        ) : (
            <Accordion type="single" collapsible className="w-full">
            {orders.map(order => (
                <AccordionItem value={order.orderNumber} key={order.orderNumber}>
                    <AccordionTrigger>
                        <div className="flex justify-between w-full pr-4">
                            <div className="text-left">
                                <p className="font-bold">{order.orderNumber}</p>
                                <p className="text-sm text-muted-foreground">{order.customerName} - Room {order.roomNumber}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold">${(order.total * 1.1).toFixed(2)}</p>
                                <p className="text-sm text-muted-foreground">{new Date(order.orderDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead className="text-center">Qty</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {order.items.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell className="text-center">{item.quantity}</TableCell>
                                    <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                         <div className="flex justify-end mt-4 text-sm">
                            <div className="text-right space-y-1">
                                <p><span className="text-muted-foreground">Subtotal:</span> ${order.total.toFixed(2)}</p>
                                <p><span className="text-muted-foreground">Taxes & Fees (10%):</span> ${(order.total * 0.1).toFixed(2)}</p>
                                <p className="font-bold"><span className="text-muted-foreground">Total:</span> ${(order.total * 1.1).toFixed(2)}</p>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
