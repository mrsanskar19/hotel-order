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
import { getData, postData } from '@/lib/api';

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
    <div ref={ref} className="p-6 bg-white text-black text-sm w-[350px]">
      {/* Header */}
      <div className="text-center mb-4 border-b pb-2">
        <h2 className="text-2xl font-bold font-headline">
          {hotelData?.name || "Restaurant"}
        </h2>
        <p>{hotelData?.address || "No address provided"}</p>
        <p>Tel: {hotelData?.phone || "N/A"}</p>
      </div>

      {/* Bill Info */}
      <div className="mb-3 text-xs">
        <p>
          <strong>Table:</strong> {tableNumber}
        </p>
        <p>
          <strong>Date:</strong> {new Date().toLocaleDateString()}{" "}
          {new Date().toLocaleTimeString()}
        </p>
      </div>
      <hr />

      {/* Order Details */}
      <div className="my-3">
        {activeOrders.map((order) => (
          <div key={order.order_id} className="mb-2">
            <h4 className="font-semibold text-sm">
              Order #{String(order.order_id).slice(-4)}
            </h4>
            <div className="mt-1 space-y-1">
              {order.items.map((item) => (
                <div
                  key={item.item_id}
                  className="flex justify-between text-xs"
                >
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span>
                    INR {(item.quantity * item.price).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <hr />

      {/* Totals */}
      <div className="mt-3 space-y-1">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>INR {totalBill.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax (8.5%)</span>
          <span>INR {(totalBill * 0.085).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Service Charge (15%)</span>
          <span>INR {(totalBill * 0.15).toFixed(2)}</span>
        </div>
        <hr />
        <div className="flex justify-between font-bold text-lg">
          <span>Total Bill</span>
          <span>INR {(totalBill * 1.235).toFixed(2)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-6 text-xs italic">
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
  const [orderData, setOrderData] = React.useState<Order[]>([]);
  const printableRef = React.useRef<HTMLDivElement>(null);

  // ✅ Fetch live orders from backend for each table
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
      printWindow.document.write("<html><head><title>Print Bill</title></head><body>");
      printWindow.document.write(printableRef.current.innerHTML);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
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
        <DialogTitle className="font-headline">
          Table {tableNumber} Details
        </DialogTitle>
        <DialogDescription>
          Review active and completed orders for this table.
        </DialogDescription>
      </DialogHeader>

      {/* Orders */}
      <div className="max-h-[60vh] overflow-y-auto pr-4">
        {orderData.length > 0 ? (
          <div className="space-y-4">
            {/* Active Orders */}
            {activeOrders.length > 0 && (
              <div>
                <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                  Active Orders
                </h3>
                <div className="space-y-4">
                  {activeOrders.map((order) => (
                    <Card key={order.order_id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center justify-between text-base">
                          <span>Order #{String(order.order_id).slice(-4)}</span>
                          <Badge variant={getStatusBadgeVariant(order.status)}>
                            {order.status}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        {order.items.map((item, idx) => (
                          <div
                            key={`${item.item_id}-${idx}`}
                            className="flex justify-between"
                          >
                            <span>
                              {item.quantity}x {item.name}
                            </span>
                            <span>
                              INR {(item.quantity * item.price).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Orders */}
            {completedOrders.length > 0 && (
              <div>
                <h3 className="mt-4 mb-2 text-sm font-semibold text-muted-foreground">
                  Completed Orders
                </h3>
                <div className="space-y-4">
                  {completedOrders.map((order) => (
                    <Card
                      key={order.order_id}
                      className="opacity-70 border border-dashed"
                    >
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
          <p className="py-8 text-center text-muted-foreground">
            No orders for this table.
          </p>
        )}
      </div>

      {/* Footer with Bill + Print */}
      <DialogFooter className="border-t pt-4 sm:justify-between">
        <div className="flex items-center justify-between font-bold text-lg">
          <span>Active Bill:</span>
          <span>INR {totalBill.toFixed(2)}</span>
        </div>
        <Button onClick={handlePrint} disabled={activeOrders.length === 0}>
          <Printer className="mr-2 h-4 w-4" />
          Print Bill
        </Button>
      </DialogFooter>

      {/* Hidden Printable Bill */}
      <div className="hidden">
        <PrintableBill
          ref={printableRef}
          orders={activeOrders}
          tableNumber={tableNumber}
          hotelData={hotelData}
        />
      </div>
    </DialogContent>
  );
};



export default function DashboardPage() {
  const { hotelIdAdmin } = useAppData();
  const [hotelData, setHotelData] = React.useState<any>(null);
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [tables, setTables] = React.useState<any[]>([]);
  const [kpi, setKpi] = React.useState<any>(null);

  const fetchDashboardData = React.useCallback(async () => {
    if (!hotelIdAdmin) return;
    try {
      const [hotel, report, dashboardData] = await Promise.all([
        getData(`hotel/${hotelIdAdmin}`),
        getData(`hotel/${hotelIdAdmin}/report`),
        getData(`orders/hotel/${hotelIdAdmin}/dashboard`),
      ]);

      setHotelData(hotel);
      setKpi(report);

      // if API gives tables → use them
      // else create default 5 tables
      let resolvedTables: any[] = [];
      if (dashboardData.tables && dashboardData.tables.length > 0) {
        resolvedTables = dashboardData.tables;
      } else {
        const count = hotel?.table_count ?? 5;
        resolvedTables = Array.from({ length: count }, (_, i) => ({
          table_id: i + 1,
          name: `T${i + 1}`,
        }));
      }
      setTables(resolvedTables);

      setOrders(dashboardData.orders || []);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    }
  }, [hotelIdAdmin]);

  React.useEffect(() => {
    if (!hotelIdAdmin) return;
    fetchDashboardData();
    const intervalId = setInterval(fetchDashboardData, 5000);
    return () => clearInterval(intervalId);
  }, [hotelIdAdmin, fetchDashboardData]);

  // Helper to get table order status from live orders
  function getLiveTableStatus(tableId: string | number) {
    const tableOrders = orders.filter(
      (o) =>
        o.table_id === tableId &&
        (o.status === "PENDING" || o.status === "PREPARING")
    );

    if (tableOrders.some((o) => o.status === "PENDING")) {
      return "Needs Attention";
    }
    if (tableOrders.some((o) => o.status === "PREPARING")) {
      return "Occupied";
    }
    return "Available";
  }

  const tableStatuses = tables.map((table) => ({
    id: table.table_id,
    name: table.name,
    status: getLiveTableStatus(table.table_id),
  }));

  const kpiData = [
    {
      title: "Revenue Today",
      value: `INR ${kpi?.totalRevenue ?? 0}`,
      change: "",
      icon: DollarSign,
    },
    {
      title: "Orders Today",
      value: `${kpi?.totalOrders ?? 0}`,
      change: "",
      icon: Utensils,
    },
  ];

  return (
    <div className="grid gap-6">
      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {kpi.title}
              </CardTitle>
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

      {/* Table overview */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Table Overview</CardTitle>
          <CardDescription>
            Live status of restaurant tables. Click a table to see details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {tableStatuses.map((table) => (
              <Dialog key={table.id}>
                <DialogTrigger asChild>
                  <div
                    className={cn(
                      "flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg transition-all shadow-md hover:scale-105",
                      getTableStatusColor(table.status)
                    )}
                  >
                    <div className="text-lg font-bold">
                      {table.name || `T${table.id}`}
                    </div>
                    <div className="text-xs">{table.status}</div>
                  </div>
                </DialogTrigger>
                <TableDetailsDialog
                  tableNumber={table.id}
                  orders={orders}
                  hotelId={hotelIdAdmin as number}
                  onOrderUpdate={fetchDashboardData}
                />
              </Dialog>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">Recent Orders</CardTitle>
          <CardDescription>
            An overview of the latest orders.
          </CardDescription>
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
                  <TableCell className="font-medium">
                    {String(order.order_id).slice(-6)}
                  </TableCell>
                  <TableCell>T{order.table_id}</TableCell>
                  <TableCell>INR {order.total_amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {order.items.reduce(
                      (acc, item) => acc + item.quantity,
                      0
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

