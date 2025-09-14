'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useOrders } from '@/hooks/use-orders';
import { BottomNav } from '@/components/bottom-nav';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SlideToConfirm } from '@/components/slide-to-confirm';
import { Receipt, Landmark, Loader2, QrCode, Download, CheckCircle, User, Phone, Eye, CreditCard, Clock, Banknote } from 'lucide-react';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { AppSidebar } from '@/components/app-sidebar';
import { AppHeader } from '@/components/app-header';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { Order } from '@/lib/types';
import { Hotel } from '@/types';
import { getData, postData, patchData } from "@/lib/api"; // Import patchData
import { useParams, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

const UPI_ID = '8351921719@axl';
const PAYEE_NAME = "Pizza Master's";

type UserInfo = {
  name: string;
  phone: string;
}

type PaymentStatus = 'idle' | 'verifying' | 'success' | 'failed';

// --- API Functions ---
async function createOrder(orderData: any) {
  return await postData('orders', orderData);
}

async function createDraftOrder(draftData: any) {
  return await postData('orders/draft', draftData);
}

async function updateOrderStatus(orderId: string, status: string) {
  return await patchData(`orders/${orderId}/status`, { status });
}

async function addOrderItem(orderId: string, itemData: any) {
  return await postData(`orders/${orderId}/item`, itemData);
}

async function addOrderItemsBulk(orderId: string, itemsData: any) {
  return await postData(`orders/${orderId}/items/bulk`, itemsData);
}

async function reorder(orderId: string) {
  return await postData(`orders/${orderId}/reorder`, {});
}
// ---------------------

export default function OrdersPage() {
  const { orders, closeOrder } = useOrders();
  const { id } = useParams();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [sliderStates, setSliderStates] = useState<{ [key: string]: { isLoading: boolean; isSuccess: boolean } }>({});
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [orderToClose, setOrderToClose] = useState<Order | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [currentStep, setCurrentStep] = useState<'info' | 'payment' | 'bill' | 'verification'>('info');
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', phone: '' });
  const [showBill, setShowBill] = useState(false);
  const [paymentTimer, setPaymentTimer] = useState(0);
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [tableIdentifier, setTableIdentifier] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const tableIdFromParams = searchParams.get('table_id');
    if (tableIdFromParams) {
      localStorage.setItem('tableId', tableIdFromParams);
      setTableIdentifier(tableIdFromParams);
    } else {
      const storedTableId = localStorage.getItem('tableId');
      if (storedTableId) {
        setTableIdentifier(storedTableId);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    asyncFunction();
  }, [id]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (paymentStatus === 'verifying' && paymentTimer > 0) {
      interval = setInterval(() => {
        setPaymentTimer(prev => {
          if (prev <= 1) {
            setPaymentStatus('success');
            toast({ title: 'Payment Detected!', description: 'Your payment has been automatically verified.', variant: 'success' });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [paymentStatus, paymentTimer, toast]);

  async function asyncFunction() {
    try {
      const hotel = await getData(`hotel/${id}`);
      setHotel(hotel);
    } catch (error) {
      console.error('Error fetching hotel:', error);
      toast({ title: 'Error', description: 'Failed to load hotel information', variant: 'destructive' });
    }
  }

  const handleSlideConfirm = (order: Order) => {
    setOrderToClose(order);
    setPaymentDialogOpen(true);
    setPaymentStatus('idle');
    setCurrentStep('info');
    setUserInfo({ name: '', phone: '' });
    setShowBill(false);
    setPaymentTimer(0);
  };

  const handleViewBill = () => {
    setCurrentStep('bill');
    setShowBill(true);
  };

  const handleProceedToPayment = () => {
    setCurrentStep('payment');
  };

  const handlePayment = () => {
    if (!orderToClose) return;
    setPaymentStatus('verifying');
    setCurrentStep('verification');
    setPaymentTimer(30);
    if (selectedPaymentMethod === 'cash') {
      setTimeout(() => {
        setPaymentStatus('success');
        toast({ title: 'Cash Payment Confirmed!', description: 'Please pay at the counter.', variant: 'success' });
      }, 2000);
    }
  };

  const handleCloseOrder = async () => {
    if (!orderToClose) return;

    setSliderStates(prev => ({ ...prev, [orderToClose.id]: { isLoading: true, isSuccess: false } }));

    try {
      await updateOrderStatus(orderToClose.id, 'PAID');
      
      setSliderStates(prev => ({ ...prev, [orderToClose.id]: { isLoading: false, isSuccess: true } }));
      toast({ 
        title: 'Order Completed!', 
        description: 'Order status updated to PAID.', 
        duration: 5000, 
        variant: 'success' 
      });

      setTimeout(() => {
        closeOrder(orderToClose.id);
        setPaymentDialogOpen(false);
        setOrderToClose(null);
      }, 1500);

    } catch (error) {
      console.error("Failed to update order status:", error);
      toast({ variant: "destructive", title: "Error", description: "Failed to close order." });
      setSliderStates(prev => ({ ...prev, [orderToClose.id]: { isLoading: false, isSuccess: false } }));
    }
  };

  const activeOrder = isClient ? orders.find(o => o.status === 'Active') : undefined;
  const imageUrl = (item: any) => (item.img) ? item.img : 'https://placehold.co/48x48.png';

  const upiUrl = useMemo(() => {
    if (!activeOrder) return '';
    const amount = activeOrder.total.toFixed(2);
    return `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=Order%20${activeOrder.id.substring(0, 6)}`;
  }, [activeOrder]);

  const qrCodeUrl = useMemo(() => {
    if (!upiUrl) return '';
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;
  }, [upiUrl]);

  const generatePdfReceipt = (order: Order, userInfo: UserInfo) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text('Foodie Go', pageWidth / 2, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Your delicious meal, delivered.', pageWidth / 2, 28, { align: 'center' });
    doc.setDrawColor(200);
    doc.line(15, 35, pageWidth - 15, 35);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Order Receipt', 15, 45);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Order ID: ${order.id.substring(0, 8)}`, 15, 52);
    doc.text(`Date: ${format(new Date(order.date), "PPP p")}`, 15, 57);
    if (userInfo.name) doc.text(`Customer Name: ${userInfo.name}`, 15, 62);
    if (userInfo.phone) doc.text(`Customer Phone: ${userInfo.phone}`, 15, 67);
    if (tableIdentifier) doc.text(`Table: ${tableIdentifier}`, 15, 72);
    (doc as any).autoTable({
      startY: 80,
      head: [['Item', 'Notes', 'Qty', 'Price', 'Total']],
      body: order.items.map(item => [
        item.name,
        item.notes || '-',
        item.quantity,
        `₹${item.price.toFixed(2)}`,
        `₹${(item.price * item.quantity).toFixed(2)}`
      ]),
      theme: 'striped',
      headStyles: { fillColor: [34, 34, 34] },
      styles: { font: 'helvetica', fontSize: 10 },
      margin: { left: 15, right: 15 }
    });
    const finalY = (doc as any).lastAutoTable.finalY;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total: ₹${order.total.toFixed(2)}`, pageWidth - 15, finalY + 15, { align: 'right' });
    doc.line(15, finalY + 25, pageWidth - 15, finalY + 25);
    doc.setFontSize(10);
    doc.text('Thank you for your order!', pageWidth / 2, finalY + 32, { align: 'center' });
    doc.save(`Foodie-Go-Receipt-${order.id.substring(0, 6)}.pdf`);
  };

  const renderBillContent = () => {
    if (!orderToClose) return null;
    
    const subtotal = orderToClose.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.085; // 8.5% tax
    const serviceCharge = subtotal * 0.15; // 15% service charge
    const total = subtotal + tax + serviceCharge;

    return (
      <div className="space-y-4 py-4 font-sans">
        <div className="border rounded-lg p-4 bg-background">
          <h3 className="font-bold text-xl mb-4 text-center font-serif">Invoice</h3>
          
          {hotel && (
            <div className='text-center mb-4'>
              <p className="font-bold text-lg">{hotel.name}</p>
              <p className="text-xs text-muted-foreground">{hotel.address}</p>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground mb-4">
            <div className="flex justify-between">
              <span>Order ID:</span>
              <span>{orderToClose.id.substring(0, 8)}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span>{format(new Date(orderToClose.date), "PPpp")}</span>
            </div>
            {tableIdentifier && (
              <div className="flex justify-between">
                <span>Table:</span>
                <span>{tableIdentifier}</span>
              </div>
            )}
            {userInfo.name && (
              <div className="flex justify-between">
                <span>Customer:</span>
                <span>{userInfo.name}</span>
              </div>
            )}
          </div>

          <Separator />

          <div className="my-4 space-y-2 text-sm">
            {orderToClose.items.map(item => (
              <div key={item.id} className="flex">
                <div className="flex-grow">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.quantity} x ₹{item.price.toFixed(2)}</p>
                </div>
                <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <Separator />

          <div className="my-4 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Taxes (8.5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service Charge (15%)</span>
              <span>₹{serviceCharge.toFixed(2)}</span>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
};

  const renderUserInfoContent = () => (
    <div className='space-y-4 py-4'>
      <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Name (Optional)" 
          className="pl-10"
          value={userInfo.name}
          onChange={(e) => setUserInfo(prev => ({...prev, name: e.target.value}))}
        />
      </div>
      <div className="relative">
        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Phone Number (Optional)" 
          type="tel"
          className="pl-10"
          value={userInfo.phone}
          onChange={(e) => setUserInfo(prev => ({...prev, phone: e.target.value}))}
        />
      </div>
    </div>
  );

  const renderPaymentContent = () => {
    switch(selectedPaymentMethod) {
      case 'upi':
        return (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg flex flex-col items-center gap-4 border">
              {qrCodeUrl ? (
                <Image src={qrCodeUrl} alt="UPI QR Code" width={200} height={200} className="rounded" />
              ) : (
                <div className="w-[200px] h-[200px] flex items-center justify-center bg-muted rounded">
                  <Loader2 className="animate-spin h-8 w-8"/>
                </div>
              )}
              <div className="text-center">
                <p className="font-mono text-sm">Scan to pay</p>
                <p className="font-bold text-lg">₹{activeOrder?.total.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">UPI ID: {UPI_ID}</p>
              </div>
            </div>
          </div>
        );
      case 'cash':
        return (
          <div className="flex flex-col items-center justify-center text-center gap-4 min-h-[200px]">
            <Banknote className="w-16 h-16 text-primary"/>
            <div>
              <p className="font-semibold text-lg">Cash Payment</p>
              <p className="text-muted-foreground">Please pay ₹{activeOrder?.total.toFixed(2)} at the counter</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderVerificationContent = () => {
    if (paymentStatus === 'success') {
      return (
        <div className="flex flex-col items-center justify-center text-center gap-4 min-h-[200px]">
          <CheckCircle className="w-16 h-16 text-green-500"/>
          <div>
            <p className="font-semibold text-xl text-green-600">Payment Successful!</p>
            <p className="text-muted-foreground">Your order has been confirmed</p>
          </div>
          <Button 
            onClick={() => orderToClose && generatePdfReceipt(orderToClose, userInfo)}
            variant="outline"
          >
            <Download className="mr-2 h-4 w-4"/>
            Download Receipt
          </Button>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center text-center gap-4 min-h-[200px]">
        <div className="relative">
          <Loader2 className="w-12 h-12 animate-spin text-primary"/>
          {paymentTimer > 0 && (
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4"/>
                <span>{paymentTimer}s</span>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4">
          <p className="font-semibold text-lg">Verifying Payment...</p>
          <p className="text-muted-foreground text-sm">
            {selectedPaymentMethod === 'upi' 
              ? 'Complete the payment in your UPI app'
              : 'Confirming cash payment at counter'
            }
          </p>
          {paymentTimer > 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              Auto-detecting payment completion...
            </p>
          )}
        </div>
        
        {selectedPaymentMethod === 'upi' && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setPaymentStatus('success');
              toast({
                title: 'Payment Confirmed!',
                description: 'Payment has been manually confirmed.',
                variant: 'success'
              });
            }}
          >
            I've completed the payment
          </Button>
        )}
      </div>
    );
  };

  const renderContent = () => {
    if (!isClient) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-muted-foreground gap-4 py-20">
          <Loader2 className="w-20 h-20 text-muted-foreground/50 animate-spin"/>
          <p className="text-lg font-semibold">Loading Orders...</p>
        </div>
      );
    }
    
    if (activeOrder) {
      const orderId = activeOrder.id;
      return (
        <Card key={orderId} className="overflow-hidden">
          <CardHeader className="flex-row justify-between items-center bg-muted/50 p-4">
            <div>
              <CardTitle className="text-lg font-headline">Order #{orderId.substring(0, 6)}</CardTitle>
              <p className="text-sm text-muted-foreground">{format(new Date(activeOrder.date), "PPP p")}</p>
              {tableIdentifier && (
                <Badge variant="outline" className="mt-1">Table {tableIdentifier}</Badge>
              )}
            </div>
            <Badge variant={activeOrder.status === 'Active' ? 'destructive' : 'secondary'}>
              {activeOrder.status}
            </Badge>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {activeOrder.items.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <Image 
                    src={imageUrl(item)} 
                    alt={item.name} 
                    width={48} 
                    height={48} 
                    className="rounded-full object-cover" 
                    data-ai-hint="food meal"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    {item.notes && (
                      <p className="text-xs text-muted-foreground italic">Note: {item.notes}</p>
                    )}
                  </div>
                  <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-4 bg-muted/50 p-4">
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total</span>
              <span>₹{activeOrder.total.toFixed(2)}</span>
            </div>
            <div className="md:hidden">
              <SlideToConfirm 
                onConfirm={() => handleSlideConfirm(activeOrder)}
                isLoading={sliderStates[orderId]?.isLoading || false}
                isSuccess={sliderStates[orderId]?.isSuccess || false}
                text="Slide to Close Order & Pay"
                successText="Order Closed!"
              />
            </div>
            <div className="hidden md:block">
              <Button 
                onClick={() => handleSlideConfirm(activeOrder)} 
                className="w-full h-12 text-base"
                disabled={sliderStates[orderId]?.isLoading || sliderStates[orderId]?.isSuccess}
              >
                {sliderStates[orderId]?.isLoading ? (
                  <Loader2 className="animate-spin mr-2" />
                ) : sliderStates[orderId]?.isSuccess ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Order Closed!
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Close Order & Pay
                  </>
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center text-center text-muted-foreground gap-4 py-20">
        <Receipt className="w-20 h-20 text-muted-foreground/50"/>
        <p className="text-lg font-semibold">No active orders</p>
        <p>Place an order to see it here.</p>
      </div>
    );
  };

  const getDialogTitle = () => {
    switch(currentStep) {
      case 'info': return 'Your Information';
      case 'bill': return 'Order Bill';
      case 'payment': return 'Choose Payment Method';
      case 'verification': return paymentStatus === 'success' ? 'Payment Complete!' : 'Processing Payment';
      default: return 'Complete Your Order';
    }
  };

  const getDialogDescription = () => {
    if (paymentStatus === 'success') return '';
    
    switch(currentStep) {
      case 'info': return 'Please provide your details for the receipt (optional).';
      case 'bill': return 'Review your order before payment.';
      case 'payment': return 'Select how you\'d like to pay for your order.';
      case 'verification': return 'Please complete your payment.';
      default: return '';
    }
  };

  if (!hotel) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4"/>
          <p className="text-muted-foreground">Loading hotel information...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex min-h-screen bg-secondary/20">
        <AppSidebar
          onOpenCart={() => {}}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          name={hotel.name}
          id={hotel.hotel_id}
          tableId={tableIdentifier}
        />
        <div className="flex-1 flex flex-col w-full md:ml-[250px]">
          <AppHeader 
            onOpenCart={() => {}} 
            searchTerm={searchTerm} 
            onSearchTermChange={setSearchTerm} 
            name={hotel.name}
            tableId={tableIdentifier}
          />
          <main className="flex-1 pb-24 md:pb-0 md:pl-0">
            <div className="container py-8">
              <h1 className="text-3xl font-bold font-headline mb-6">Your Order</h1>
              {renderContent()}
            </div>
          </main>
        </div>
        <BottomNav onOpenCart={() => {}} />
      </div>

      <AlertDialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>{getDialogTitle()}</AlertDialogTitle>
            {getDialogDescription() && (
              <AlertDialogDescription>
                {getDialogDescription()}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>

          <div className="py-4">
            {currentStep === 'info' && renderUserInfoContent()}
            {currentStep === 'bill' && renderBillContent()}
            {currentStep === 'payment' && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button 
                    variant={selectedPaymentMethod === 'upi' ? 'default' : 'outline'} 
                    className="flex-1" 
                    onClick={() => setSelectedPaymentMethod('upi')}
                  >
                    <QrCode className="w-4 h-4 mr-2"/>
                    UPI
                  </Button>
                  <Button 
                    variant={selectedPaymentMethod === 'cash' ? 'default' : 'outline'} 
                    className="flex-1" 
                    onClick={() => setSelectedPaymentMethod('cash')}
                  >
                    <Banknote className="w-4 h-4 mr-2"/>
                    Cash
                  </Button>
                </div>
                {renderPaymentContent()}
              </div>
            )}
            {currentStep === 'verification' && renderVerificationContent()}
          </div>

          <AlertDialogFooter className="flex-col sm:flex-row gap-2">
            {paymentStatus === 'success' ? (
              <Button onClick={handleCloseOrder} className="w-full">
                <CheckCircle className="mr-2 h-4 w-4" />
                Complete Order
              </Button>
            ) : currentStep === 'info' ? (
              <>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button onClick={handleViewBill}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Bill
                </Button>
              </>
            ) : currentStep === 'bill' ? (
              <>
                <Button variant="outline" onClick={() => setCurrentStep('info')}>
                  Back
                </Button>
                <Button onClick={handleProceedToPayment}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Proceed to Pay
                </Button>
              </>
            ) : currentStep === 'payment' ? (
              <>
                <Button variant="outline" onClick={() => setCurrentStep('bill')}>
                  Back to Bill
                </Button>
                <Button onClick={handlePayment} disabled={paymentStatus === 'verifying'}>
                  {paymentStatus === 'verifying' ? (
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  ) : (
                    <CreditCard className="mr-2 h-4 w-4" />
                  )}
                  Pay ₹{activeOrder?.total.toFixed(2)}
                </Button>
              </>
            ) : (
              <div className="w-full" />
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
