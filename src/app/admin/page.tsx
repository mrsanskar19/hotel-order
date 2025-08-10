'use client';

import { useState } from 'react';
import { useMenu } from '@/hooks/useMenu';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import MenuForm from '@/components/admin/MenuForm';
import { MenuTable } from '@/components/admin/MenuTable';
import type { MenuItem } from '@/lib/types';
import { PlusCircle, ListOrdered, Utensils } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderHistory } from '@/components/admin/OrderHistory';


export default function AdminDashboardPage() {
  const { menuItems, addMenuItem, updateMenuItem } = useMenu();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const handleFormSubmit = (data: Omit<MenuItem, 'id'> | MenuItem) => {
    if ('id' in data) {
      updateMenuItem(data);
    } else {
      addMenuItem(data);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="p-4 animation-fade-in pb-20">
      <header className="flex justify-between items-center mb-6">
        <h1 className="font-headline text-3xl text-primary">Admin Dashboard</h1>
      </header>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="orders"><ListOrdered className="mr-2 h-4 w-4"/>Orders</TabsTrigger>
          <TabsTrigger value="menu"><Utensils className="mr-2 h-4 w-4"/>Menu</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <OrderHistory />
        </TabsContent>
        <TabsContent value="menu">
            <div className="flex justify-end mb-4 mt-2">
                 <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={handleAddNew}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Item
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</DialogTitle>
                        <DialogDescription>
                            {editingItem ? 'Update the details of the existing menu item.' : 'Fill in the details for the new menu item.'}
                        </DialogDescription>
                        </DialogHeader>
                        <MenuForm
                        onSubmit={handleFormSubmit}
                        defaultValues={editingItem}
                        />
                    </DialogContent>
                </Dialog>
            </div>
          <MenuTable menuItems={menuItems} onEdit={handleEdit} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
