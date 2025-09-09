'use client';

import type { CartItem } from '@/hooks/use-cart';
import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { useOrderSocket } from '@/hooks/useOrderSocket';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Active' | 'Closed';
  tableId?: string | number | null;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (items: CartItem[], total: number, tableId?: string | number | null) => void;
  closeOrder: (orderId: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const getInitialState = (): Order[] => {
  if (typeof window === 'undefined') return [];
  try {
    const item = window.localStorage.getItem('foodie-orders');
    const parsed = item ? JSON.parse(item) : [];
    return parsed.filter((o: Order) => o.status === 'Active');
  } catch (error) {
    console.warn('Error reading orders from localStorage', error);
    return [];
  }
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(getInitialState);

  // 🔑 Get hotelId / tableNo / userId from localStorage
  const hotelId = typeof window !== 'undefined' ? Number(localStorage.getItem("hotel_id") || 1) : undefined;
  const tableNo = typeof window !== 'undefined' ? localStorage.getItem("table_no") || "T1" : undefined;
  const userId = typeof window !== 'undefined' ? Number(localStorage.getItem("user_id") || 123) : undefined;

  const { activeOrder, createOrder, addItem, closeOrder: socketCloseOrder } = useOrderSocket(hotelId, tableNo, userId);

  // Persist orders in localStorage
  useEffect(() => {
    try {
      const activeOrders = orders.filter(o => o.status === 'Active');
      window.localStorage.setItem('foodie-orders', JSON.stringify(activeOrders));
    } catch (error) {
      console.warn('Error writing orders to localStorage', error);
    }
  }, [orders]);

  // 🆕 Add or update order
  const addOrder = useCallback((newItems: CartItem[], cartTotal: number, tableId?: string | number | null) => {
    setOrders((prevOrders) => {
      const activeOrder = prevOrders.find(o => o.status === 'Active');

      if (activeOrder) {
        // Merge with existing order
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

        // 🔗 Sync with WebSocket
        addItem(activeOrder.id, newItems[0]); // (example: add first item; can loop if needed)

        return prevOrders.map(o =>
          o.id === activeOrder.id
            ? { ...o, items: updatedItems, total: newTotal, date: new Date().toISOString() }
            : o
        );
      } else {
        // Create a new order if no active one exists
        const newOrder: Order = {
          id: new Date().getTime().toString(),
          items: newItems,
          total: cartTotal,
          date: new Date().toISOString(),
          status: 'Active',
          tableId: tableId,
        };

        // 🔗 Sync with WebSocket
        createOrder(newItems.map(i => ({ itemId: i.id, qty: i.quantity, price: i.price })), tableId);

        return [newOrder, ...prevOrders];
      }
    });
  }, [addItem, createOrder]);

  // ❌ Close order
  const closeOrder = useCallback((orderId: string) => {
    setOrders((prevOrders) => prevOrders.filter((o) => o.id !== orderId));
    socketCloseOrder(Number(orderId)); // 🔗 sync close with server
  }, [socketCloseOrder]);

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
