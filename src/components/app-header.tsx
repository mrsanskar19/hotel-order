
'use client';

import { Search, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';
import { useState, useEffect } from 'react';

interface AppHeaderProps {
  onOpenCart: () => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  name:string;
}

export function AppHeader({ onOpenCart, searchTerm, onSearchTermChange,name }: AppHeaderProps) {
  const { totalItems } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
        <div className="container flex h-16 items-center justify-between gap-4">
            <h1 className="text-xl font-bold font-headline text-primary whitespace-nowrap">{name}</h1>
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search for food..." 
                    className="pl-10 w-full bg-muted"
                    value={searchTerm}
                    onChange={(e) => onSearchTermChange(e.target.value)}
                />
            </div>
             <Button variant="ghost" size="icon" onClick={onOpenCart} className="relative h-10 w-10 shrink-0 hidden">
                <ShoppingCart className="h-6 w-6" />
                 {isClient && totalItems > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] justify-center p-1 text-xs font-mono">
                    {totalItems}
                  </Badge>
                )}
            </Button>
        </div>
    </header>
  );
}
