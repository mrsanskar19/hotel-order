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
import { DollarSign, Printer, Utensils, WifiOff } from 'lucide-react';

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
import { useAppData } from '@/hooks/useAppData';
import { getData, postData } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

type OrderItem = {
  item_id: number;
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  order_id: number;
  table_id: string | number;
  total_amount: number;
  status: 'PENDING' | 'PREPARING' | 'DELIVERED' | 'CANCELLED';
  items: OrderItem[];
};

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

function getTableStatusColor(status: string) {
  switch (status) {
    case 'FREE':
      return 'bg-white border hover:bg-muted';
    case 'OCCUPIED':
      return 'bg-yellow-200';
    case 'NEEDS_ATTENTION':
      return 'bg-red-300';
    default:
      return 'bg-gray-200';
  }
}

// PrintableBill.tsx
const PrintableBill = React.forwardRef<
  HTMLDivElement,
  { orders: Order[]; tableNumber: number | string; hotelData: any }
>(({ orders: activeOrders, tableNumber, hotelData }, ref) => {
  const totalBill = activeOrders.reduce(
    (sum, order) => sum + order.total_amount,
    0
  );

  return (
    <div ref={ref} className="p-4 bg-white text-black text-sm w-[320px]">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold font-headline">
          {hotelData?.name || "Restaurant"}
        </h2>
        <p className="text-xs">{hotelData?.address || ""}</p>
        <p className="text-xs">Tel: {hotelData?.phone || "N/A"}</p>
      </div>

      <div className="mb-2 text-xs">
        <p><strong>Table:</strong> {tableNumber}</p>
        <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
      </div>
      <Separator className="my-2" />

      <div className="my-2">
        {activeOrders.map((order) => (
          <div key={order.order_id} className="mb-2">
            <h4 className="font-semibold text-xs">
              Order #{String(order.order_id).slice(-4)}
            </h4>
            {order.items.map((item) => (
              <div key={item.item_id} className="flex justify-between text-xs">
                <span>{item.quantity}x {item.name}</span>
                <span>₹{(item.quantity * item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Separator className="my-2" />

      <div className="mt-2 space-y-1 text-xs">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{totalBill.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (8.5%)</span>
          <span>₹{(totalBill * 0.085).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Service Charge (15%)</span>
          <span>₹{(totalBill * 0.15).toFixed(2)}</span>
        </div>
        <Separator className="my-1" />
        <div className="flex justify-between font-bold text-base">
          <span>Total</span>
          <span>₹{(totalBill * 1.235).toFixed(2)}</span>
        </div>
      </div>

      <div className="text-center mt-4 text-xs italic">
        <p>Thank you for dining with us!</p>
      </div>
    </div>
  );
});
PrintableBill.displayName = "PrintableBill";

// TableDetailsDialog.tsx
const TableDetailsDialog = ({
  tableNumber,
  hotelId,
  hotelData,
  onOrderUpdate,
}: {
  tableNumber: number | string;
  hotelId: number;
  hotelData: any;
  onOrderUpdate: () => void;
}) => {
  const { toast } = useToast();
  const [orderData, setOrderData] = React.useState<Order[]>([]);
  const printableRef = React.useRef<HTMLDivElement>(null);

  const fetchTableOrders = React.useCallback(async () => {
    try {
      const data = await getData(`orders/hotel/${hotelId}/table/${tableNumber}`);
      setOrderData(data || []);
    } catch (error) {
      console.error("Failed to fetch table orders:", error);
    }
  }, [hotelId, tableNumber]);

  React.useEffect(() => {
    fetchTableOrders();
    const intervalId = setInterval(fetchTableOrders, 5000);
    return () => clearInterval(intervalId);
  }, [fetchTableOrders]);

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow && printableRef.current) {
      printWindow.document.write(`<html><head><title>Print Bill</title></head><body>${printableRef.current.innerHTML}</body></html>`);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleClearTable = async () => {
    try {
      await getData(`orders/hotel/${hotelId}/table/${tableNumber}/free`);
      toast({ title: "Success", description: `Table ${tableNumber} has been marked as free.` });
      onOrderUpdate(); // Refresh dashboard data
    } catch (error) {
      console.error("Failed to clear table:", error);
      toast({ variant: "destructive", title: "Error", description: "Failed to clear table." });
    }
  };

  const activeOrders = orderData.filter(
    (o) => o.status === "PENDING" || o.status === "PREPARING"
  );
  const completedOrders = orderData.filter((o) => o.status === "DELIVERED");
  const totalBill = activeOrders.reduce((sum, o) => sum + o.total_amount, 0);

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="font-headline">Table {tableNumber} Details</DialogTitle>
        <DialogDescription>Review orders and manage table status.</DialogDescription>
      </DialogHeader>

      <div className="max-h-[60vh] overflow-y-auto pr-4">
        {orderData.length > 0 ? (
          <div className="space-y-4">
            {activeOrders.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Active Orders</h3>
                <div className="space-y-4">
                  {activeOrders.map((order) => (
                    <Card key={order.order_id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center justify-between text-base">
                          <span>Order #{String(order.order_id).slice(-4)}</span>
                          <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        {order.items.map((item, idx) => (
                          <div key={`${item.item_id}-${idx}`} className="flex justify-between">
                            <span>{item.quantity}x {item.name}</span>
                            <span>₹{(item.quantity * item.price).toFixed(2)}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            {completedOrders.length > 0 && (
              <div>
                <h3 className="mt-4 mb-2 text-sm font-semibold text-muted-foreground">Completed Orders</h3>
                <div className="space-y-4">
                  {completedOrders.map((order) => (
                    <Card key={order.order_id} className="opacity-70 border-dashed">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center justify-between text-base">
                          <span>Order #{String(order.order_id).slice(-4)}</span>
                          <Badge variant="default">{order.status}</Badge>
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="py-8 text-center text-muted-foreground">No orders for this table.</p>
        )}
      </div>

      <DialogFooter className="border-t pt-4 sm:justify-between gap-2">
        <div className="flex items-center font-bold text-lg">
          <span>Active Bill:</span>
          <span className="ml-2">₹{totalBill.toFixed(2)}</span>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleClearTable} variant="outline">
            <WifiOff className="mr-2 h-4 w-4" /> Clear Table
          </Button>
          <Button onClick={handlePrint} disabled={activeOrders.length === 0}>
            <Printer className="mr-2 h-4 w-4" /> Print Bill
          </Button>
        </div>
      </DialogFooter>

      <div className="hidden">
        <PrintableBill ref={printableRef} orders={activeOrders} tableNumber={tableNumber} hotelData={hotelData} />
      </div>
    </DialogContent>
  );
};

export default function DashboardPage() {
  const { hotelIdAdmin } = useAppData();
  const [hotelData, setHotelData] = React.useState<any>(null);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [tableStatuses, setTableStatuses] = React.useState<any[]>([]);
  const [kpi, setKpi] = React.useState<any>(null);

  const fetchDashboardData = React.useCallback(async () => {
    if (!hotelIdAdmin) return;
    try {
      const [hotel, report, dashboard, statuses] = await Promise.all([
        getData(`hotel/${hotelIdAdmin}`),
        getData(`hotel/${hotelIdAdmin}/report`),
        getData(`orders/hotel/${hotelIdAdmin}/dashboard`),
        getData(`orders/hotel/${hotelIdAdmin}/tables/status`),
      ]);

      setHotelData(hotel);
      setKpi(report);
      setOrders(dashboard.orders || []);
      
      let finalTables = statuses || [];
      const minTables = 5;
      if (finalTables.length < minTables) {
        const existingTableIds = new Set(finalTables.map(t => t.table_id));
        for (let i = 1; finalTables.length < minTables; i++) {
          const newTableId = `T${i}`;
          if (!existingTableIds.has(newTableId)) {
            finalTables.push({ hotel_id: hotelIdAdmin, table_id: newTableId, status: 'FREE' });
          }
        }
      }
      setTableStatuses(finalTables);

    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  }, [hotelIdAdmin]);

  React.useEffect(() => {
    if (hotelIdAdmin) {
      fetchDashboardData();
      const intervalId = setInterval(fetchDashboardData, 5000);
      return () => clearInterval(intervalId);
    }
  }, [hotelIdAdmin, fetchDashboardData]);

  const statusDisplayMap: { [key: string]: string } = {
    FREE: 'Available',
    OCCUPIED: 'Occupied',
    NEEDS_ATTENTION: 'Needs Attention',
  };

  const kpiData = [
    { title: "Revenue Today", value: `₹${kpi?.totalRevenue ?? 0}`, icon: DollarSign },
    { title: "Orders Today", value: `${kpi?.totalOrders ?? 0}`, icon: Utensils },
  ];

  const activeOrders = orders.filter(o => o.status === 'PENDING' || o.status === 'PREPARING');

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline">Table Overview</CardTitle>
          <CardDescription>Live status of restaurant tables.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {tableStatuses.map((table) =>
              table.status === 'FREE' ? (
                <div key={table.table_id} className={cn("flex aspect-square flex-col items-center justify-center rounded-lg border bg-slate-50 shadow-sm")}>
                  <div className="text-lg font-bold">{table.table_id}</div>
                  <div className="text-xs text-muted-foreground">{statusDisplayMap[table.status]}</div>
                </div>
              ) : (
                <Dialog key={table.table_id}>
                  <DialogTrigger asChild>
                    <div className={cn("flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg transition-all shadow-md hover:scale-105", getTableStatusColor(table.status))}>
                      <div className="text-lg font-bold">{table.table_id}</div>
                      <div className="text-xs">{statusDisplayMap[table.status]}</div>
                    </div>
                  </DialogTrigger>
                  <TableDetailsDialog
                    tableNumber={table.table_id}
                    hotelId={hotelIdAdmin as number}
                    hotelData={hotelData}
                    onOrderUpdate={fetchDashboardData}
                  />
                </Dialog>
              )
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline">Active Orders</CardTitle>
          <CardDescription>Orders that are currently pending or in preparation.</CardDescription>
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
              {activeOrders.length > 0 ? activeOrders.map((order: Order) => (
                <TableRow key={order.order_id}>
                  <TableCell className="font-medium">{String(order.order_id).slice(-6)}</TableCell>
                  <TableCell>{order.table_id}</TableCell>
                  <TableCell>₹{order.total_amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>{order.items.reduce((acc, item) => acc + item.quantity, 0)}</TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No active orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
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
              {orders.slice(0, 10).map((order: Order) => (
                <TableRow key={order.order_id}>
                  <TableCell className="font-medium">{String(order.order_id).slice(-6)}</TableCell>
                  <TableCell>{order.table_id}</TableCell>
                  <TableCell>₹{order.total_amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>{order.items.reduce((acc, item) => acc + item.quantity, 0)}</TableCell>
                </TableRow>
              ))}
              {orders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
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
