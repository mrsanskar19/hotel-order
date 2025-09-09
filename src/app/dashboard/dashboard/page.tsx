'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Printer, Utensils } from 'lucide-react';

import type { Order } from '@/types';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useAppData } from '@/hooks/useAppData';
import { getData } from '@/lib/api';
import { getSocket } from '@/lib/socket';

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

function getTableStatusColor(status: string) {
  switch (status) {
    case 'Available':
      return 'bg-white border hover:bg-muted';
    case 'Occupied':
      return 'bg-yellow-200';
    case 'Needs Attention':
      return 'bg-red-300';
    default:
      return 'bg-gray-200';
  }
}

const PrintableBill = React.forwardRef<
  HTMLDivElement,
  { orders: Order[], tableNumber: number | string }
>(({ orders, tableNumber }, ref) => {
  const totalBill = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div ref={ref} className="p-4 bg-white text-black">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold font-headline">GastronomeOS Modern Eatery</h2>
        <p>123 Culinary Lane, Foodie City, 10101</p>
        <p>Tel: (123) 456-7890</p>
      </div>
      <Separator className="my-2 bg-black" />
      <h3 className="text-xl font-semibold">Table: {tableNumber}</h3>
      <p>Date: {new Date().toLocaleDateString()}</p>
      <Separator className="my-2 bg-black" />
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id}>
            <h4 className="font-semibold">Order #{order.id.slice(-4)}</h4>
            <div className="space-y-1 mt-1">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span>${(item.quantity * item.price).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Separator className="my-4 border-dashed border-black" />
       <div className="space-y-2">
         <div className="flex justify-between font-semibold">
           <span>Subtotal</span>
           <span>${totalBill.toFixed(2)}</span>
         </div>
         <div className="flex justify-between text-sm">
           <span>Tax (8.5%)</span>
           <span>${(totalBill * 0.085).toFixed(2)}</span>
         </div>
          <div className="flex justify-between text-sm">
           <span>Service Charge (15%)</span>
           <span>${(totalBill * 0.15).toFixed(2)}</span>
         </div>
         <Separator className="my-2 bg-black"/>
         <div className="flex justify-between font-bold text-lg">
           <span>Total Bill</span>
           <span>${(totalBill * 1.235).toFixed(2)}</span>
         </div>
       </div>
       <div className="text-center mt-6 text-sm">
        <p>Thank you for dining with us!</p>
       </div>
    </div>
  );
});
PrintableBill.displayName = 'PrintableBill';


const TableDetailsDialog = ({ tableNumber, orders: initialOrders }: { tableNumber: number | string, orders: Order[] }) => {
  const [orderData, setOrderData] = React.useState<Order[]>(initialOrders);
  const printableRef = React.useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow && printableRef.current) {
        printWindow.document.write('<html><head><title>Print Bill</title>');
        printWindow.document.write('<style>body { font-family: sans-serif; } .page { width: 300px; margin: 0 auto; } h2, h3, h4 { margin: 0; } .text-center { text-align: center; } .mb-4 { margin-bottom: 1rem; } .my-2 { margin-top: 0.5rem; margin-bottom: 0.5rem; } .separator { border-top: 1px solid black; } .font-bold { font-weight: bold; } .font-semibold { font-weight: 600; } .text-2xl { font-size: 1.5rem; } .text-xl { font-size: 1.25rem; } .flex { display: flex; } .justify-between { justify-content: space-between; } .text-sm { font-size: 0.875rem; } .mt-1 { margin-top: 0.25rem; } .space-y-1 > * + * { margin-top: 0.25rem; } .space-y-4 > * + * { margin-top: 1rem; } .mt-6 { margin-top: 1.5rem; } .space-y-2 > * + * { margin-top: 0.5rem; } .text-lg { font-size: 1.125rem; } .p-4 { padding: 1rem; } </style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(`<div class="page">${printableRef.current.innerHTML}</div>`);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }
  };

  const handleStatusUpdate = (orderId: string, value: number) => {
    const updatedOrders = orderData.map((order) =>
      order.id === orderId
        ? { ...order, status: value === 100 ? 'Completed' : order.status }
        : order
    );
    setOrderData(updatedOrders);
  };

  const activeOrders = orderData.filter(
    (o) => o.status === 'Pending' || o.status === 'Preparing'
  );
  const completedOrders = orderData.filter((o) => o.status === 'Completed');
  const totalBill = activeOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="font-headline">Table {tableNumber} Details</DialogTitle>
        <DialogDescription>
          Review active and completed orders for this table.
        </DialogDescription>
      </DialogHeader>
      <div className="max-h-[60vh] overflow-y-auto pr-4">
        {orderData.length > 0 ? (
          <div className="space-y-4">
            {activeOrders.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Active Orders</h3>
                <div className="space-y-4">
                  {activeOrders.map((order) => (
                    <Card key={order.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center justify-between text-base">
                          <span>Order #{order.id.slice(-4)}</span>
                          <Badge variant={getStatusBadgeVariant(order.status)}>
                            {order.status}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <span>
                              {item.quantity}x {item.name}
                            </span>
                            <span>${(item.quantity * item.price).toFixed(2)}</span>
                          </div>
                        ))}
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </CardContent>
                      {order.status === 'Preparing' && (
                        <CardFooter className="px-4 pb-4">
                          <Slider
                            defaultValue={[0]}
                            max={100}
                            step={1}
                            onValueChange={(value) => handleStatusUpdate(order.id, value[0])}
                            className="interactive-slider"
                          />
                        </CardFooter>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}
             {completedOrders.length > 0 && (
              <div>
                <h3 className="mb-2 mt-4 text-sm font-semibold text-muted-foreground">Completed Orders</h3>
                 <div className="space-y-4">
                  {completedOrders.map((order) => (
                    <Card key={order.id} className="opacity-60">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center justify-between text-base">
                           <span>Order #{order.id.slice(-4)}</span>
                          <Badge variant="default">
                            {order.status}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <span>
                              {item.quantity}x {item.name}
                            </span>
                            <span>${(item.quantity * item.price).toFixed(2)}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="py-8 text-center text-muted-foreground">
            No orders for this table.
          </p>
        )}
      </div>
      <DialogFooter className="border-t pt-4 sm:justify-between">
        <div className="flex items-center justify-between font-bold text-lg">
          <span>Active Bill:</span>
          <span>${totalBill.toFixed(2)}</span>
        </div>
        <Button onClick={handlePrint} disabled={activeOrders.length === 0}>
          <Printer className="mr-2 h-4 w-4" />
          Print Bill
        </Button>
      </DialogFooter>
      <div className="hidden">
        <PrintableBill ref={printableRef} orders={activeOrders} tableNumber={tableNumber}/>
      </div>
    </DialogContent>
  );
};

export default function DashboardPage() {
  const { hotelId } = useAppData();
  const [data, setData] = React.useState<any>(null);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [tables, setTables] = React.useState<any[]>([]);
  const [kip,setKip] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  const socket = getSocket();
  
  React.useEffect(() => {
    if (hotelId) {
      const fetchAllData = async () => {
          setLoading(true);
          const [hotelData, kipData, ordersData, tablesData] = await Promise.all([
              getData(`hotel/${hotelId}`),
              getData(`hotel/${hotelId}/report`),
              getData(`orders/hotel/${hotelId}`),
              getData(`hotel/${hotelId}/tables`) 
          ]);

          setData(hotelData);
          setKip(kipData);
          setOrders(ordersData || []);
          setTables(tablesData || []);
          setLoading(false);
      };
      fetchAllData();

      socket.on('connect', () => {
        console.log('connected');
        socket.emit('join', `hotel_${hotelId}`)
      })

      socket.on('new_order', (order) => {
        setOrders((prevOrders) => [order, ...prevOrders]);
        // You might want to refetch tables or update their status here
      });

      return () => {
        socket.off('connect');
        socket.off('new_order');
      }
    }
  }, [hotelId, socket]);


  function getLiveTableStatus(tableId: string | number) {
    const tableOrders = orders.filter(
      (o) =>
        (o.table_id === tableId) &&
        (o.status === 'Pending' || o.status === 'Preparing')
    );

    if (tableOrders.some((o) => o.status === 'Pending')) {
      return 'Needs Attention';
    }
    if (tableOrders.some((o) => o.status === 'Preparing')) {
      return 'Occupied';
    }
    return 'Available';
  }

  const tableStatuses = tables.map((table) => ({
      id: table.id,
      status: getLiveTableStatus(table.id),
    }));


const kpiData = [
  {
    title: 'Revenue Today',
    value: `INR${kip?.totalRevenue ?? 0}`,
    change: '',
    icon: DollarSign,
  },
  {
    title: 'Orders Today',
    value: `${kip?.totalOrders ?? 0}`,
    change: '',
    icon: Utensils,
  },
];

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">
                {kpi.change} from yesterday
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Table Overview</CardTitle>
            <CardDescription>
              Live status of restaurant tables. Click a table to see details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {tables.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {tableStatuses.map((table) => (
                  <Dialog key={table.id}>
                    <DialogTrigger asChild>
                      <div
                        className={cn(
                          'flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg transition-all shadow-md hover:scale-105',
                          getTableStatusColor(table.status)
                        )}
                      >
                        <div className="text-lg font-bold">T{table.id}</div>
                        <div className="text-xs">{table.status}</div>
                      </div>
                    </DialogTrigger>
                    <TableDetailsDialog tableNumber={table.id} orders={orders.filter(o => o.table_id === table.id)} />
                  </Dialog>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No tables found. Please add tables in settings.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Recent Orders</CardTitle>
          <CardDescription>An overview of the latest orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Table</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.length > 0 ? (
                orders.slice(0, 5).map((order: Order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id.slice(-6)}</TableCell>
                    <TableCell>{order.table_id}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {order.items.reduce((acc, item) => acc + item.quantity, 0)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No recent orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
