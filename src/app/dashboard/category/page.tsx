'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

import { AddCategoryDialog } from '@/components/AddMenuItemDialog';
import { getData, deleteData } from '@/lib/api';
import { useAppData } from '@/hooks/useAppData';

export default function MenuPage() {
  const [items, setItems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const appData = useAppData();
  const hotelIdAdmin = appData?.hotelIdAdmin;

  const fetchMenuItems = async () => {
    if (!hotelIdAdmin) return;
    setLoading(true);
    try {
      const data = await getData(`hotel/${hotelIdAdmin}/categories`);
      setItems(data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchMenuItems();
  }, [hotelIdAdmin]);

  const handleAddItem = async () => {
    fetchMenuItems();
  };

  return (
    <div className="space-y-6">
      {/* Heading Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold font-headline">Menu Management</h1>
        <AddCategoryDialog onSave={handleAddItem} triggerText="Add Category" />
      </div>

      {/* Table Section */}
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Menu Items</CardTitle>
          <CardDescription>
            Manage your restaurant&apos;s categories and items here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  Image
                </TableHead>
                <TableHead className="w-[200px]">Category Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right w-[180px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                // 🔹 Skeleton Rows while loading
                Array.from({ length: 4 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="hidden sm:table-cell">
                      <Skeleton className="h-16 w-16 rounded-md" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-32" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-64" />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Skeleton className="h-8 w-16 rounded" />
                        <Skeleton className="h-8 w-16 rounded" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : items.length > 0 ? (
                // 🔹 Real Data Rows
                items.map((item) => (
                  <TableRow key={item.category_id}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt={item.name}
                        className="aspect-square rounded-md object-cover border"
                        height="64"
                        src={item?.imageUrl || '/hero.png'}
                        loading="lazy"
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.description || 'No description'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <AddCategoryDialog
                          onSave={handleAddItem}
                          triggerText="Edit"
                          itemId={item.category_id}
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={async () => {
                            try {
                              await deleteData(
                                `hotel/${hotelIdAdmin}/categories/${item.category_id}`
                              );
                              fetchMenuItems();
                            } catch (error) {
                              console.error('Delete failed:', error);
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                // 🔹 Empty State
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">
                    No categories found. Add one to get started!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

