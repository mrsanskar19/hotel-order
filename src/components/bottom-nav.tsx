
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingCart, ListOrdered } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useOrders } from '@/hooks/use-orders';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';


interface BottomNavProps {
  onOpenCart: () => void;
}

export function BottomNav({ onOpenCart }: BottomNavProps) {
  const { totalItems } = useCart();
  const { orders } = useOrders();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const activeOrdersCount = isClient ? orders.filter(o => o.status === 'Active').length : 0;


  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-background border-t z-50 md:hidden">
      <div className="container h-full">
        <div className="grid grid-cols-3 items-center h-full text-center">
            <Link href="./" className={cn(
              'flex flex-col items-center gap-1 h-full justify-center',
              pathname === '/' ? 'text-primary' : 'text-muted-foreground'
            )}>
              <Home className="w-6 h-6" />
              <span className="text-xs font-medium">Menu</span>
            </Link>

            <div className="relative flex justify-center">
                <button 
                    className="absolute -top-8 flex flex-col items-center justify-center gap-1 text-muted-foreground bg-background rounded-full w-16 h-16 border-4 border-background shadow-lg" 
                    onClick={onOpenCart}
                >
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground">
                        <ShoppingCart className="w-6 h-6" />
                        {isClient && totalItems > 0 && (
                            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] justify-center p-1 text-xs font-mono">
                                {totalItems}
                            </Badge>
                        )}
                    </div>
                </button>
            </div>
            
            <Link href={`./orders`} className={cn(
              'flex flex-col items-center gap-1 relative h-full justify-center',
              pathname === '/orders' ? 'text-primary' : 'text-muted-foreground'
            )}>
              <ListOrdered className="w-6 h-6" />
              <span className="text-xs font-medium">Orders</span>
              {isClient && activeOrdersCount > 0 && (
                <Badge className="absolute top-3 right-5 h-5 min-w-[1.25rem] justify-center p-1 text-xs font-mono">
                    {activeOrdersCount}
                </Badge>
              )}
            </Link>
        </div>
      </div>
    </div>
  );
}
