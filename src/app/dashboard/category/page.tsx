'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  MoreHorizontal,
  PlusCircle,
  Sparkles,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { menuItems } from '@/lib/data';


import { AddCategoryDialog } from '@/components/AddMenuItemDialog';

import { getData } from '@/lib/api';
import { useEffect } from 'react';
import { useAppData } from '@/hooks/useAppData';

export default function MenuPage() {
  const [items, setItems] = React.useState(menuItems);
  const [filter, setFilter] = React.useState('all');
  const { hotelId } = useAppData();

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'in-stock') return item.inStock;
    if (filter === 'out-of-stock') return !item.inStock;
    return true;
  });

  const handleStockChange = (itemId: number, inStock: boolean) => {
    setItems(items.map(item => item.id === Number(itemId) ? {...item, inStock} : item));
  };

  const fetchMenuItems = async () => {
    try {
      const data = await getData(`hotel/${hotelId}/categories`);
      console.log('Fetched categories:', data);
      setItems(data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  }
  useEffect(() => {
    fetchMenuItems();
    console.log(hotelId, items);
  }, []);

  const handleAddItem = async() => {
    fetchMenuItems();
  }

  return (
    <Tabs defaultValue="all" onValueChange={setFilter}>
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="in-stock">In Stock</TabsTrigger>
          <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
           <AddCategoryDialog onSave={()=>handleAddItem()}/>
        </div>
      </div>
      <TabsContent value={filter}>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Menu Items</CardTitle>
            <CardDescription>
              Manage your restaurant's menu items here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    Image
                  </TableHead>
                  <TableHead>Category Name</TableHead>
                  <TableHead>Descriptions</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt={item.name}
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={item?.imageUrl}
                        width="64"
                        data-ai-hint={item?.imageHint}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
