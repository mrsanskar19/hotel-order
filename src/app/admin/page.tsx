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
import { PlusCircle } from 'lucide-react';

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
        <h1 className="font-headline text-3xl text-primary">Menu Management</h1>
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
      </header>
      
      <MenuTable menuItems={menuItems} onEdit={handleEdit} />
    </div>
  );
}
