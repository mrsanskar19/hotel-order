'use client';

import * as React from 'react';
import Image from 'next/image';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { AddMenuItemDialog } from '@/components/AddMenuItemDialog';
import { getData, deleteData, patchData } from '@/lib/api';
import { useAppData } from '@/hooks/useAppData';
import { Skeleton } from '@/components/ui/skeleton';

export default function MenuPage() {
  const [items, setItems] = React.useState<any[]>([]);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [search, setSearch] = React.useState('');
  const [filterCategory, setFilterCategory] = React.useState<number | null>(null);
  const [filterStock, setFilterStock] = React.useState<string>('all'); // 'all' | 'in-stock' | 'out-of-stock'
  const [loading, setLoading] = React.useState(true);

  const { hotelIdAdmin } = useAppData();

  const fetchData = async () => {
    if (!hotelIdAdmin) return;
    setLoading(true);
    try {
      const [itemsRes, categoriesRes] = await Promise.all([
        getData(`hotel/${hotelIdAdmin}/items`),
        getData(`hotel/${hotelIdAdmin}/categories`),
      ]);
      setItems(itemsRes);
      setCategories(categoriesRes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [hotelIdAdmin]);

  const getCategoryName = (id: number) => {
    const cat = categories.find((c) => c.category_id === id);
    return cat ? cat.name : 'Unknown';
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory = !filterCategory || item.category_id === filterCategory;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesStock =
      filterStock === 'all'
        ? true
        : filterStock === 'in-stock'
        ? item.available
        : !item.available;
    return matchesCategory && matchesSearch && matchesStock;
  });

  const toggleAvailability = async (itemId: number, available: boolean) => {
    if (!hotelIdAdmin) return;
    try {
      await patchData(`hotel/${hotelIdAdmin}/item/${itemId}/availability`, { available });
      setItems((prev) =>
        prev.map((item) =>
          item.item_id === itemId ? { ...item, available } : item
        )
      );
    } catch (error) {
      console.error('Failed to update availability', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Skeleton className="h-10 w-64 rounded" />
          <Skeleton className="h-10 w-48 rounded" />
        </div>
        <div className="grid gap-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Card key={idx} className="p-4">
              <CardContent>
                <Skeleton className="h-6 w-1/3 mb-2 rounded" />
                <Skeleton className="h-6 w-full mb-2 rounded" />
                <Skeleton className="h-6 w-1/4 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Menu Management</h1>
      <p className="text-muted-foreground">Manage all items in your restaurant menu</p>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
  {/* Left side: Search & Filters */}
  <div className="flex flex-wrap gap-3 items-center">
    {/* Search */}
    <Input
      placeholder="Search items..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full md:w-64"
    />

    {/* Category Filter */}
    <select
      className="border border-gray-300 dark:border-gray-600 p-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
      value={filterCategory ?? ''}
      onChange={(e) =>
        setFilterCategory(e.target.value ? Number(e.target.value) : null)
      }
    >
      <option value="">All Categories</option>
      {categories.map((c) => (
        <option key={c.category_id} value={c.category_id}>
          {c.name}
        </option>
      ))}
    </select>

    {/* Stock Filter */}
    <select
      className="border border-gray-300 dark:border-gray-600 p-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
      value={filterStock}
      onChange={(e) => setFilterStock(e.target.value)}
    >
      <option value="all">All</option>
      <option value="in-stock">In Stock</option>
      <option value="out-of-stock">Out of Stock</option>
    </select>
  </div>

  {/* Right side: Add Button */}
  <div className="flex-shrink-0">
    <AddMenuItemDialog onSave={fetchData} />
  </div>
</div>


      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Menu Items</CardTitle>
          <CardDescription>
            List of all items including category, price, availability, and actions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead>Available</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.item_id}>
                  <TableCell className="hidden sm:table-cell">
                    {item.img && (
                      <Image
  src={item.img}
  width={64}
  height={64}
  alt={item.name}
  className="rounded-md object-cover"
  loading="lazy"
/>

                    )}
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{getCategoryName(item.category_id)}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">${item.price}</TableCell>
                  <TableCell>
                    <Switch
                      checked={item.available}
                      onCheckedChange={(checked) => toggleAvailability(item.item_id, checked)}
                    />
                  </TableCell>
                  <TableCell className="text-right flex gap-2 justify-end">
                    <AddMenuItemDialog
                      onSave={fetchData}
                      itemId={item.item_id}
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={async () => {
                        try {
                          await deleteData(`hotel/${hotelIdAdmin}/items/${item.item_id}`);
                          fetchData();
                        } catch (error) {
                          console.error('Delete failed', error);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center p-4">
                    No items found.
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

