'use client';

import { createContext, useState, ReactNode, useEffect } from 'react';
import type { MenuItem } from '@/lib/types';

const initialMenuItems: MenuItem[] = [
  { id: '1', name: 'Margherita Pizza', description: 'Classic pizza with tomato, mozzarella, and basil.', price: 12.99, imageUrl: 'https://placehold.co/600x400.png', category: 'Pizzas', isAvailable: true, 'data-ai-hint': 'pizza food' },
  { id: '2', name: 'Pasta Carbonara', description: 'Spaghetti with eggs, cheese, pancetta, and pepper.', price: 15.50, imageUrl: 'https://placehold.co/600x400.png', category: 'Pastas', isAvailable: true, 'data-ai-hint': 'pasta food' },
  { id: '3', name: 'Caesar Salad', description: 'Romaine lettuce and croutons dressed with Parmesan cheese.', price: 9.75, imageUrl: 'https://placehold.co/600x400.png', category: 'Salads', isAvailable: true, 'data-ai-hint': 'salad bowl' },
  { id: '4', name: 'Tiramisu', description: 'Coffee-flavoured Italian dessert.', price: 7.00, imageUrl: 'https://placehold.co/600x400.png', category: 'Desserts', isAvailable: false, 'data-ai-hint': 'tiramisu dessert' },
  { id: '5', name: 'Bruschetta', description: 'Grilled bread with garlic, topped with tomato and olive oil.', price: 6.50, imageUrl: 'https://placehold.co/600x400.png', category: 'Appetizers', isAvailable: true, 'data-ai-hint': 'bruschetta appetizer' }
];

interface MenuContextType {
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (itemId: string) => void;
}

export const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  
  useEffect(() => {
    // In a real app, you'd fetch this from a DB. Here we use initial data.
    setMenuItems(initialMenuItems);
  }, []);

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    setMenuItems(prevItems => [...prevItems, newItem]);
  };

  const updateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems(prevItems => prevItems.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const deleteMenuItem = (itemId: string) => {
    setMenuItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, updateMenuItem, deleteMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
}
