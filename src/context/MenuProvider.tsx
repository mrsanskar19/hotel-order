'use client';

import { createContext, useState, ReactNode, useEffect } from 'react';
import type { MenuItem } from '@/lib/types';

const initialMenuItems: MenuItem[] = [
  { id: '1', name: 'Margherita Pizza', description: 'Classic pizza with tomato, mozzarella, and basil. A timeless favorite that brings the taste of Italy to your plate.', price: 450.00, imageUrl: 'https://placehold.co/600x400.png', category: 'Pizzas', isAvailable: true, 'data-ai-hint': 'pizza food' },
  { id: '2', name: 'Pasta Carbonara', description: 'Spaghetti with eggs, cheese, pancetta, and pepper. A creamy and savory Roman classic.', price: 550.00, imageUrl: 'https://placehold.co/600x400.png', category: 'Pastas', isAvailable: true, 'data-ai-hint': 'pasta food' },
  { id: '3', name: 'Caesar Salad', description: 'Romaine lettuce and croutons dressed with Parmesan cheese, lemon juice, olive oil, egg, Worcestershire sauce, garlic, and black pepper.', price: 350.00, imageUrl: 'https://placehold.co/600x400.png', category: 'Salads', isAvailable: true, 'data-ai-hint': 'salad bowl' },
  { id: '4', name: 'Tiramisu', description: 'Coffee-flavoured Italian dessert. It is made of ladyfingers (savoiardi) dipped in coffee, layered with a whipped mixture of eggs, sugar, and mascarpone cheese, flavoured with cocoa.', price: 250.00, imageUrl: 'https://placehold.co/600x400.png', category: 'Desserts', isAvailable: false, 'data-ai-hint': 'tiramisu dessert' },
  { id: '5', name: 'Bruschetta', description: 'Grilled bread with garlic, topped with tomato, fresh basil, and olive oil. A perfect starter to awaken your taste buds.', price: 200.00, imageUrl: 'https://placehold.co/600x400.png', category: 'Appetizers', isAvailable: true, 'data-ai-hint': 'bruschetta appetizer' },
  { id: '6', name: 'Paneer Tikka', description: 'Cubes of paneer marinated in spices and grilled in a tandoor. Served with mint chutney.', price: 380, imageUrl: 'https://placehold.co/600x400.png', category: 'Appetizers', isAvailable: true, 'data-ai-hint': 'paneer tikka' },
  { id: '7', name: 'Dal Makhani', description: 'A classic Indian dish made with whole black lentils, red kidney beans, butter, and cream.', price: 420, imageUrl: 'https://placehold.co/600x400.png', category: 'Main Course', isAvailable: true, 'data-ai-hint': 'dal makhani' },
  { id: '8', name: 'Gulab Jamun', description: 'Soft, melt-in-your-mouth, fried dumplings traditionally made of thickened or reduced milk and soaked in rose-flavored sugar syrup.', price: 150, imageUrl: 'https://placehold.co/600x400.png', category: 'Desserts', isAvailable: true, 'data-ai-hint': 'gulab jamun' }
];

interface MenuContextType {
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (itemId: string) => void;
  getMenuItem: (itemId: string) => MenuItem | undefined;
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

  const getMenuItem = (itemId: string) => {
    return menuItems.find(item => item.id === itemId);
  }

  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, updateMenuItem, deleteMenuItem, getMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
}
