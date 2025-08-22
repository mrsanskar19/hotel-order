
'use client';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingCart, Loader2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCart, type CartItem } from '@/hooks/use-cart';
import { useOrders } from '@/hooks/use-orders';
import { SlideToConfirm } from '@/components/slide-to-confirm';
import { useState } from 'react';

interface CartSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onOrderPlaced: () => void;
}

export function CartSheet({ isOpen, onOpenChange, onOrderPlaced }: CartSheetProps) {
  const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePlaceOrder = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
        addOrder(cartItems, totalPrice);
        setIsLoading(false);
        setIsSuccess(true);
        
        setTimeout(() => {
            onOpenChange(false);
            onOrderPlaced();
            clearCart();
            // Reset success state after the sheet is closed
            setTimeout(() => setIsSuccess(false), 500);
        }, 1500);
    }, 2000);
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl flex flex-col md:max-w-md md:right-0 md:h-full md:rounded-none">
        <SheetHeader className='text-center'>
          <SheetTitle className="font-headline text-3xl">Your Cart</SheetTitle>
        </SheetHeader>
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-1 -mx-6">
              <div className="px-6 divide-y">
                {cartItems.map(item => (
                  <CartItemRow key={item.id} item={item} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
                ))}
              </div>
            </ScrollArea>
            <Separator className="my-4" />
            <SheetFooter className="flex flex-col gap-4">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="md:hidden">
                <SlideToConfirm 
                  onConfirm={handlePlaceOrder}
                  isLoading={isLoading}
                  isSuccess={isSuccess}
                  text="Slide to place order"
                  successText="Order Updated!"
                />
              </div>
              <div className="hidden md:block">
                  <Button 
                    onClick={handlePlaceOrder} 
                    className="w-full h-12 text-base"
                    disabled={isLoading || isSuccess}
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : isSuccess ? (
                      'Order Placed!'
                    ) : (
                      'Place Order'
                    )}
                  </Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground gap-4">
            <ShoppingCart className="w-20 h-20 text-muted-foreground/50"/>
            <p className="text-lg font-semibold">Your cart is empty</p>
            <p>Add some delicious food to get started!</p>
            <Button onClick={() => onOpenChange(false)}>Start Ordering</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CartItemRow({ item, updateQuantity, removeFromCart }: { item: CartItem, updateQuantity: (id: number, q: number) => void, removeFromCart: (id: number) => void }) {
  const imageUrl = (item.images && item.images.length > 0) ? item.images[0] : 'https://placehold.co/64x64.png';
  return (
    <div className="flex items-center gap-4 py-4">
      <Image src={imageUrl} alt={item.name} width={64} height={64} className="rounded-md object-cover" data-ai-hint="food meal"/>
      <div className="flex-1">
        <p className="font-semibold">{item.name}</p>
        <p className="text-sm text-muted-foreground">₹{item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-6 text-center font-bold">{item.quantity}</span>
        <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id)}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
