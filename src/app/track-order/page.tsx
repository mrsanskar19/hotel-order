'use client';
import { useState, useEffect, useCallback } from 'react';
import type { Order, OrderStatus } from '@/lib/types';
import AppContainer from '@/components/AppContainer';
import BottomNav from '@/components/BottomNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChefHat, CookingPot, Bike, PartyPopper, Timer } from 'lucide-react';

const statusSteps = [
    { status: 'Confirmed', icon: ChefHat, description: 'Your order has been confirmed.', duration: 2 * 60 * 1000 },
    { status: 'Preparing', icon: CookingPot, description: 'The chefs are preparing your meal.', duration: 8 * 60 * 1000 },
    { status: 'Out for Delivery', icon: Bike, description: 'Your order is on its way to your table.', duration: 5 * 60 * 1000 },
    { status: 'Delivered', icon: PartyPopper, description: 'Enjoy your meal!', duration: 0 },
];

export default function TrackOrderPage() {
    const [lastOrder, setLastOrder] = useState<Order | null>(null);
    const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
    const [timeRemaining, setTimeRemaining] = useState('');
    const [progress, setProgress] = useState(0);

    const updateOrderStatus = useCallback((status: OrderStatus) => {
        setOrderStatus(status);
        if (status.orderNumber) {
            localStorage.setItem(`orderStatus_${status.orderNumber}`, JSON.stringify(status));
        }
    }, []);

    useEffect(() => {
        const storedOrder = localStorage.getItem('lastOrder');
        if (storedOrder) {
            const parsedOrder: Order = JSON.parse(storedOrder);
            setLastOrder(parsedOrder);

            const storedStatus = localStorage.getItem(`orderStatus_${parsedOrder.orderNumber}`);
            if (storedStatus) {
                const parsedStatus = JSON.parse(storedStatus);
                 // If the order was already delivered, don't restart the process
                 if(parsedStatus.status === 'Delivered') {
                    setOrderStatus(parsedStatus);
                } else {
                    // otherwise, find current status and recalculate time
                    const currentStepIndex = statusSteps.findIndex(step => step.status === parsedStatus.status);
                    const newEstimatedTime = new Date(new Date(parsedStatus.startTime).getTime() + statusSteps[currentStepIndex].duration);
                    
                    const updatedStatus: OrderStatus = {
                        ...parsedStatus,
                        estimatedDeliveryTime: newEstimatedTime.toISOString()
                    };
                    updateOrderStatus(updatedStatus);
                }
            } else {
                 const initialStatus: OrderStatus = {
                    orderNumber: parsedOrder.orderNumber,
                    status: 'Confirmed',
                    startTime: new Date().toISOString(),
                    estimatedDeliveryTime: new Date(Date.now() + statusSteps[0].duration).toISOString(),
                };
                updateOrderStatus(initialStatus);
            }
        }
    }, [updateOrderStatus]);
    
    useEffect(() => {
        if (!orderStatus || !orderStatus.startTime) return;

        const interval = setInterval(() => {
            const currentStepIndex = statusSteps.findIndex(step => step.status === orderStatus.status);
            
            if (orderStatus.status === 'Delivered') {
                setTimeRemaining('Delivered');
                setProgress(100);
                clearInterval(interval);
                return;
            }

            const deliveryTime = new Date(orderStatus.estimatedDeliveryTime).getTime();
            const now = new Date().getTime();
            const distance = deliveryTime - now;

            if (distance < 0) {
                 const nextStepIndex = Math.min(currentStepIndex + 1, statusSteps.length - 1);
                 const nextStatus = statusSteps[nextStepIndex].status as Order['status'];
                 const newStatus: OrderStatus = { 
                     ...orderStatus, 
                     status: nextStatus,
                     startTime: new Date().toISOString(),
                     estimatedDeliveryTime: new Date(Date.now() + statusSteps[nextStepIndex].duration).toISOString()
                 };

                 if(nextStatus === 'Delivered') {
                     newStatus.estimatedDeliveryTime = new Date().toISOString();
                 }
                updateOrderStatus(newStatus);
            } else {
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setTimeRemaining(`${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2, '0')}`);
                
                const stepDuration = statusSteps[currentStepIndex].duration;
                const elapsedTimeInStep = stepDuration - distance;
                const stepProgress = (elapsedTimeInStep / stepDuration) * 100;

                const totalProgressBeforeCurrent = (currentStepIndex / (statusSteps.length -1)) * 100;
                const progressInCurrent = stepProgress / (statusSteps.length-1);
                
                setProgress(Math.min(totalProgressBeforeCurrent + progressInCurrent, 100));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [orderStatus, updateOrderStatus]);


    if (!lastOrder) {
        return (
            <AppContainer>
                <main className="flex-grow flex items-center justify-center p-4">
                    <div className="text-center">
                        <Timer className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h1 className="text-2xl font-headline mt-4">No Active Order</h1>
                        <p className="text-muted-foreground">You haven't placed an order yet.</p>
                    </div>
                </main>
                <BottomNav />
            </AppContainer>
        );
    }
    
    const currentStepIndex = statusSteps.findIndex(step => step.status === orderStatus?.status);

    return (
        <AppContainer>
            <main className="flex-grow overflow-y-auto p-4 animation-fade-in">
                <header className="text-center mb-6">
                    <h1 className="font-headline text-3xl text-primary">Track Your Order</h1>
                    <p className="text-muted-foreground">Order #{lastOrder.orderNumber}</p>
                </header>

                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Estimated Arrival</CardTitle>
                        <CardDescription className="text-2xl font-bold text-primary">{timeRemaining}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Progress value={progress} className="w-full" />
                    </CardContent>
                </Card>

                <div className="mt-8 space-y-4 relative">
                     <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border -z-10"></div>
                    {statusSteps.map((step, index) => (
                        <div key={step.status} className="flex items-center space-x-4 relative">
                            <div className={`flex items-center justify-center w-12 h-12 rounded-full z-10 ${index <= currentStepIndex ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                <step.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className={`font-bold ${index <= currentStepIndex ? 'text-foreground' : 'text-muted-foreground'}`}>{step.status}</h3>
                                <p className="text-sm text-muted-foreground">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <BottomNav />
        </AppContainer>
    );
}
