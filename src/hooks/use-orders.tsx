
'use client';

import type { CartItem } from '@/hooks/use-cart';
import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Active' | 'Closed';
}

interface OrderContextType {
  orders: Order[];
  addOrder: (items: CartItem[], total: number) => void;
  closeOrder: (orderId: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const getInitialState = (): Order[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const item = window.localStorage.getItem('foodie-orders');
    // Only load active orders from storage.
    const parsed = item ? JSON.parse(item) : [];
    return parsed.filter((o: Order) => o.status === 'Active');
  } catch (error) {
    console.warn('Error reading orders from localStorage', error);
    return [];
  }
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(getInitialState);
  
  useEffect(() => {
    try {
      // We only store active orders
      const activeOrders = orders.filter(o => o.status === 'Active');
      window.localStorage.setItem('foodie-orders', JSON.stringify(activeOrders));
    } catch (error) {
      console.warn('Error writing orders to localStorage', error);
    }
  }, [orders]);

  const addOrder = useCallback((newItems: CartItem[], cartTotal: number) => {
    setOrders((prevOrders) => {
      const activeOrder = prevOrders.find(o => o.status === 'Active');

      if (activeOrder) {
        // Merge new items with existing items in the active order
        const updatedItems = [...activeOrder.items];
        newItems.forEach(newItem => {
          const existingItemIndex = updatedItems.findIndex(item => item.id === newItem.id);
          if (existingItemIndex > -1) {
            updatedItems[existingItemIndex].quantity += newItem.quantity;
          } else {
            updatedItems.push(newItem);
          }
        });
        
        const newTotal = updatedItems.reduce((total, item) => total + item.price * item.quantity, 0);

        return prevOrders.map(o => 
          o.id === activeOrder.id 
            ? { ...o, items: updatedItems, total: newTotal, date: new Date().toISOString() } 
            : o
        );
      } else {
        // Create a new order if no active order exists
        const newOrder: Order = {
          id: new Date().getTime().toString(),
          items: newItems,
          total: cartTotal,
          date: new Date().toISOString(),
          status: 'Active',
        };
        return [newOrder, ...prevOrders];
      }
    });
  }, []);

  const closeOrder = useCallback((orderId: string) => {
    setOrders((prevOrders) => prevOrders.filter((o) => o.id !== orderId));
  }, []);

  const value = useMemo(() => ({
    orders,
    addOrder,
    closeOrder,
  }), [orders, addOrder, closeOrder]);

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
