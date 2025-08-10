'use client';

import type { MenuItem } from '@/lib/types';
import { useMenu } from '@/hooks/useMenu';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FilePenLine, Trash2 } from 'lucide-react';

interface MenuTableProps {
  menuItems: MenuItem[];
  onEdit: (item: MenuItem) => void;
}

export function MenuTable({ menuItems, onEdit }: MenuTableProps) {
  const { deleteMenuItem, updateMenuItem } = useMenu();

  const handleToggleAvailable = (item: MenuItem) => {
    updateMenuItem({ ...item, isAvailable: !item.isAvailable });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Available</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {item.name}
                <div className="text-xs text-muted-foreground">{item.category}</div>
              </TableCell>
              <TableCell>₹{item.price.toFixed(2)}</TableCell>
              <TableCell>
                <Switch
                  checked={item.isAvailable}
                  onCheckedChange={() => handleToggleAvailable(item)}
                  aria-label={`Toggle availability for ${item.name}`}
                />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                    <FilePenLine className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteMenuItem(item.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
