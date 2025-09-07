
'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useOrders } from '@/hooks/use-orders';
import { BottomNav } from '@/components/bottom-nav';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SlideToConfirm } from '@/components/slide-to-confirm';
import { Receipt, CreditCard, Landmark, CircleDot, Loader2, QrCode, Download, CheckCircle, User, Phone } from 'lucide-react';
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { AppSidebar } from '@/components/app-sidebar';
import { AppHeader } from '@/components/app-header';
import { Input } from '@/components/ui/input';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import type { Order } from '@/lib/types';

import { getData } from "@/lib/api";
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';


const UPI_ID = '8767595276@fam';
const PAYEE_NAME = 'Foodie Go';

type UserInfo = {
  name: string;
  phone: string;
}

export default function OrdersPage() {
  const { orders, closeOrder } = useOrders();
  const {id} = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [sliderStates, setSliderStates] = useState<{ [key: string]: { isLoading: boolean; isSuccess: boolean } }>({});
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [orderToClose, setOrderToClose] = useState<Order | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');
  const [customUpiId, setCustomUpiId] = useState('');
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [isUserInfoNext, setIsUserInfoNext] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', phone: '' });

  const [hotel,setHotel] = useState(null);

  useEffect(() => {
    // This trick prevents hydration errors by ensuring this component only renders on the client.
    setIsClient(true); 
  }, []);

  const handleSlideConfirm = (order: Order) => {
    setOrderToClose(order);
    setPaymentDialogOpen(true);
    setIsPaymentSuccess(false);
    setIsVerifying(false);
    setCustomUpiId('');
    setIsUserInfoNext(false);
    setUserInfo({ name: '', phone: '' });
  };

  const handlePayment = () => {
    if (!orderToClose) return;

    setIsVerifying(true);
    
    // Simulate API call for payment verification
    setTimeout(() => {
        setIsVerifying(false);
        setIsPaymentSuccess(true);
    }, 2000);
  };
  
  const handleCloseOrder = () => {
    if (!orderToClose) return;
    setPaymentDialogOpen(false);
    setSliderStates(prev => ({ ...prev, [orderToClose.id]: { isLoading: true, isSuccess: false } }));
    
    setTimeout(() => {
      setSliderStates(prev => ({ ...prev, [orderToClose.id]: { isLoading: false, isSuccess: true } }));
      toast({ title: 'Payment Successful!', description: 'Your order has been closed.', duration: 5000, variant: 'success' });
      
      setTimeout(() => {
        closeOrder(orderToClose.id);
        setSliderStates(prev => {
          const newStates = { ...prev };
          delete newStates[orderToClose.id];
          return newStates;
        });
        setOrderToClose(null);
      }, 1500);
    }, 1000);
  };

  const activeOrder = isClient ? orders.find(o => o.status === 'Active') : undefined;
  const imageUrl = (item: any) => (item.images && item.images.length > 0) ? item.images[0] : 'https://placehold.co/48x48.png';

  const upiUrl = useMemo(() => {
    if (!activeOrder) return '';
    const amount = activeOrder.total.toFixed(2);
    const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR`;
    return upiLink;
  }, [activeOrder]);

  const qrCodeUrl = useMemo(() => {
    if (!upiUrl) return '';
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;
  }, [upiUrl]);

  const generatePdfReceipt = (order: Order, userInfo: UserInfo) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text('Foodie Go', pageWidth / 2, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Your delicious meal, delivered.', pageWidth / 2, 28, { align: 'center' });
    
    doc.setDrawColor(200);
    doc.line(15, 35, pageWidth - 15, 35);
    
    // Order Details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Order Receipt', 15, 45);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Order ID: ${order.id.substring(0, 8)}`, 15, 52);
    doc.text(`Date: ${format(new Date(order.date), "PPP p")}`, 15, 57);
    if(userInfo.name) doc.text(`Customer Name: ${userInfo.name}`, 15, 62);
    if(userInfo.phone) doc.text(`Customer Phone: ${userInfo.phone}`, 15, 67);


    // Items Table
    (doc as any).autoTable({
        startY: 75,
        head: [['Item', 'Notes', 'Quantity', 'Price', 'Total']],
        body: order.items.map(item => [
            item.name,
            item.notes || '-',
            item.quantity,
            `₹${item.price.toFixed(2)}`,
            `₹${(item.price * item.quantity).toFixed(2)}`
        ]),
        theme: 'striped',
        headStyles: { fillColor: [34, 34, 34] }, // Dark grey for header
        styles: { font: 'helvetica', fontSize: 10 },
        margin: { left: 15, right: 15 }
    });
    
    // Total
    const finalY = (doc as any).lastAutoTable.finalY;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total: ₹${order.total.toFixed(2)}`, pageWidth - 15, finalY + 15, { align: 'right' });
    
    // Footer
    doc.line(15, finalY + 25, pageWidth - 15, finalY + 25);
    doc.setFontSize(10);
    doc.text('Thank you for your order!', pageWidth / 2, finalY + 32, { align: 'center' });
    
    doc.save(`Foodie-Go-Receipt-${order.id.substring(0,6)}.pdf`);
  }

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
            </div>
            <Badge variant={activeOrder.status === 'Active' ? 'destructive' : 'secondary'}>{activeOrder.status}</Badge>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {activeOrder.items.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <Image src={imageUrl(item)} alt={item.name} width={48} height={48} className="rounded-full object-cover" data-ai-hint="food meal"/>
                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                )
              )}
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
                      <Loader2 className="animate-spin" />
                    ) : sliderStates[orderId]?.isSuccess ? (
                      'Order Closed!'
                    ) : (
                      'Close Order & Pay'
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
  }

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
    if (isVerifying) {
        return (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground gap-4 min-h-[200px]">
                <Loader2 className="w-12 h-12 animate-spin text-primary"/>
                <p className="font-semibold text-lg">Verifying payment...</p>
            </div>
        );
    }

    if (isPaymentSuccess) {
        return (
            <div className="flex flex-col items-center justify-center text-center gap-4 min-h-[200px]">
                <CheckCircle className="w-16 h-16 text-green-500"/>
                <p className="font-semibold text-xl">Payment Successful!</p>
                <Button onClick={() => orderToClose && generatePdfReceipt(orderToClose, userInfo)}>
                    <Download className="mr-2 h-4 w-4"/>
                    Download Receipt
                </Button>
            </div>
        );
    }

    switch(selectedPaymentMethod) {
      case 'upi':
        return (
          <div className="space-y-4">
             <div className="bg-white p-4 rounded-lg flex flex-col items-center gap-4">
              {qrCodeUrl ? (
                <Image src={qrCodeUrl} alt="UPI QR Code" width={200} height={200} />
              ) : (
                <div className="w-[200px] h-[200px] flex items-center justify-center">
                    <Loader2 className="animate-spin"/>
                </div>
              )}
              <p className="font-mono text-sm text-center">Scan to pay <span className='font-bold'>₹{activeOrder?.total.toFixed(2)}</span> <br/> or use the options below.</p>
            </div>
            
            <Button asChild variant="outline" className="w-full">
              <Link href={upiUrl}>Pay with UPI App</Link>
            </Button>

            <div className='text-center text-muted-foreground text-sm'>OR PAY TO UPI ID</div>

            <Input 
              placeholder="Enter your UPI ID to pay" 
              value={customUpiId}
              onChange={(e) => setCustomUpiId(e.target.value)}
              className="text-center"
            />
          </div>
        );
      case 'card':
        return <p className="text-center text-muted-foreground min-h-[200px] flex items-center justify-center">Card payment options coming soon.</p>;
      case 'netbanking':
        return <p className="text-center text-muted-foreground min-h-[200px] flex items-center justify-center">Net banking options coming soon.</p>;
      default:
        return null;
    }
  }

     useEffect(()=>{
  asyncFuncation();
  },[])

  async function asyncFuncation(){
    const hotel = await getData(`hotel/${id}`);
    setHotel(hotel)
    console.log(hotel)
  }

  if (!hotel) {
    return <div className="p-6 text-red-500">Hotel not found</div>;
  }



  return (
    <>
      <div className="flex min-h-screen bg-secondary/20">
        <AppSidebar
          onOpenCart={() => {}}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          name={hotel.name}
        />
        <div className="flex-1 flex flex-col w-full md:ml-[250px]">
            <AppHeader 
                onOpenCart={() => {}} 
                searchTerm={searchTerm} 
                onSearchTermChange={setSearchTerm} 
                name={hotel.name}
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
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{isUserInfoNext ? 'Complete Your Payment' : 'Your Information'}</AlertDialogTitle>
             {!isPaymentSuccess && (
              <AlertDialogDescription>
                {isUserInfoNext 
                    ? 'Choose your preferred payment method to close the order.'
                    : 'Please provide your details for the receipt (optional).'
                }
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>

          {!isUserInfoNext ? renderUserInfoContent() : (
              <div className="space-y-4 py-4">
                  {!isVerifying && !isPaymentSuccess && (
                    <div className="flex gap-2">
                      <Button variant={selectedPaymentMethod === 'upi' ? 'default' : 'outline'} className="flex-1" onClick={() => setSelectedPaymentMethod('upi')}>
                        <CircleDot className="w-5 h-5 mr-2"/>
                        <span className="font-semibold">UPI</span>
                      </Button>
                      <Button variant={selectedPaymentMethod === 'card' ? 'default' : 'outline'} className="flex-1" onClick={() => setSelectedPaymentMethod('card')}>
                        <CreditCard className="w-5 h-5 mr-2"/>
                        <span className="font-semibold">Card</span>
                      </Button>
                      <Button variant={selectedPaymentMethod === 'netbanking' ? 'default' : 'outline'} className="flex-1" onClick={() => setSelectedPaymentMethod('netbanking')}>
                        <Landmark className="w-5 h-5 mr-2"/>
                        <span className="font-semibold">Banking</span>
                      </Button>
                    </div>
                  )}
                  <div className="pt-4 min-h-[200px] flex items-center justify-center">
                    {renderPaymentContent()}
                  </div>
              </div>
          )}

          <AlertDialogFooter>
            {isPaymentSuccess ? (
                <Button onClick={handleCloseOrder} className="w-full">Done</Button>
            ) : !isUserInfoNext ? (
                <>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => setIsUserInfoNext(true)}>Next</AlertDialogAction>
                </>
            ) : (
                <>
                    <Button variant="outline" onClick={() => setIsUserInfoNext(false)}>Back</Button>
                    <AlertDialogAction onClick={handlePayment} disabled={selectedPaymentMethod === 'upi' && !customUpiId || isVerifying}>
                        {isVerifying ? <Loader2 className="animate-spin" /> : `Pay ₹${activeOrder?.total.toFixed(2)}`}
                    </AlertDialogAction>
                </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
