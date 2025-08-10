'use client';

import Image from 'next/image';
import type { MenuItem } from '@/lib/types';
import { Button } from './ui/button';
import { useCart } from '@/hooks/useCart';
import { PlusCircle } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="bg-card rounded-lg shadow-md overflow-hidden flex transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold font-headline">{item.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="text-lg font-bold text-primary">${item.price.toFixed(2)}</p>
          <Button size="sm" onClick={() => addToCart(item)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
      <div className="w-32 flex-shrink-0">
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={128}
          height={128}
          className="object-cover h-full w-full"
          data-ai-hint={item['data-ai-hint']}
        />
      </div>
    </div>
  );
}
