
'use client';
import { ShoppingCart, Search, Home, ListOrdered } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useOrders } from '@/hooks/use-orders';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface AppSidebarProps {
  onOpenCart: () => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

export function AppSidebar({ onOpenCart, searchTerm, onSearchTermChange }: AppSidebarProps) {
  const { totalItems } = useCart();
  const { orders } = useOrders();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const activeOrdersCount = isClient ? orders.filter(o => o.status === 'Active').length : 0;

  const navItems = [
    { href: '/', label: 'Menu', icon: Home },
    { href: '/orders', label: 'Orders', icon: ListOrdered, badge: activeOrdersCount },
  ];

  return (
    <aside className="fixed top-0 left-0 h-full w-[250px] border-r bg-background hidden md:flex flex-col z-50">
      <div className="p-4">
        <h1 className="text-2xl font-bold font-headline text-primary">Foodie Go</h1>
      </div>
      <div className="p-4">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
                placeholder="Search for food..." 
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => onSearchTermChange(e.target.value)}
            />
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant={pathname === item.href ? 'secondary' : 'ghost'}
            className="w-full justify-start text-base"
            asChild
          >
            <Link href={item.href}>
              <item.icon className="mr-4 h-5 w-5" />
              {item.label}
              {isClient && item.badge !== undefined && item.badge > 0 && (
                <Badge className="ml-auto">{item.badge}</Badge>
              )}
            </Link>
          </Button>
        ))}
      </nav>
      <div className="p-4 mt-auto border-t">
         <Button variant="outline" onClick={onOpenCart} className="w-full relative justify-start text-base">
            <ShoppingCart className="h-5 w-5 mr-4" />
            <span>View Cart</span>
            {isClient && totalItems > 0 && (
              <Badge variant="destructive" className="absolute top-1/2 -translate-y-1/2 right-4 h-5 min-w-[1.25rem] justify-center p-1 text-xs font-mono">
                {totalItems}
              </Badge>
            )}
          </Button>
      </div>
    </aside>
  );
}
