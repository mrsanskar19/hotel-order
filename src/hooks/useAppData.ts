'use client';

import { useEffect, useState, useCallback } from "react";
import { getSocket } from "@/lib/socket";
import { getData, postData } from "@/lib/api";
import { jwtDecode } from "jwt-decode";

export interface Order {
  order_id: number;
  items: { item_id: number; quantity: number; price: number }[];
  total_amount: number;
  status: "PENDING" | "CONFIRMED" | "PREPARING" | "READY" | "DELIVERED" | "CANCELLED";
  created_at: string;
}

interface AppDataHook {
  hotelId: number | null;
  hotelIdAdmin: number | null;
  tableId: string | null;
  activeOrders: Order[];
  closedOrders: Order[];
  createOrder: (items: { item_id: number; quantity: number; price: number }[], total_amount: number, payment_mode: string) => Promise<void>;
  updateOrder: (orderId: number, items: { item_id: number; quantity: number; price: number }[]) => Promise<void>;
  closeOrder: (orderId: number) => Promise<void>;
  resetAll: () => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export function useAppData(): AppDataHook {
  const [hotelId, setHotelId] = useState<number | null>(null);
  const [hotelIdAdmin, setHotelIdAdmin] = useState<number | null>(null);
  const [tableId, setTableId] = useState<string | null>(null);
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [closedOrders, setClosedOrders] = useState<Order[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // ---- Initialize from localStorage (client only) ----
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isInitialized) return; // Prevent multiple initializations

    try {
      setIsLoading(true);
      
      const savedHotelId = localStorage.getItem("hotel_id");
      const savedHotelIdAdmin = localStorage.getItem("hotel_id_admin");
      const savedTableId = localStorage.getItem("table_id");
      const savedActiveOrders = localStorage.getItem("active_orders");
      const savedClosedOrders = localStorage.getItem("closed_orders");

      setHotelId(savedHotelId ? parseInt(savedHotelId) : null);
      setHotelIdAdmin(savedHotelIdAdmin ? parseInt(savedHotelIdAdmin) : null);
      setTableId(savedTableId || null);
      setActiveOrders(savedActiveOrders ? JSON.parse(savedActiveOrders) : []);
      setClosedOrders(savedClosedOrders ? JSON.parse(savedClosedOrders) : []);
      setIsAuthenticated(!!savedHotelIdAdmin);
      setIsInitialized(true);
    } catch (err) {
      console.error("Error restoring state from localStorage", err);
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  // ---- Sync to localStorage whenever data changes (only after initialization) ----
  useEffect(() => {
    if (typeof window === "undefined" || !isInitialized) return;

    try {
      if (hotelId !== null) {
        localStorage.setItem("hotel_id", hotelId.toString());
      } else {
        localStorage.removeItem("hotel_id");
      }

      if (hotelIdAdmin !== null) {
        localStorage.setItem("hotel_id_admin", hotelIdAdmin.toString());
      } else {
        localStorage.removeItem("hotel_id_admin");
      }

      if (tableId) {
        localStorage.setItem("table_id", tableId);
      } else {
        localStorage.removeItem("table_id");
      }

      localStorage.setItem("active_orders", JSON.stringify(activeOrders));
      localStorage.setItem("closed_orders", JSON.stringify(closedOrders));
    } catch (err) {
      console.error("Error saving state to localStorage", err);
    }
  }, [hotelId, hotelIdAdmin, tableId, activeOrders, closedOrders, isInitialized]);

  // ---- Actions ----
  const createOrder = useCallback(
    async (items: { item_id: number; quantity: number; price: number }[], total_amount: number, payment_mode: string) => {
      if (!hotelId) throw new Error("No hotelId set");
      
      try {
        const order = await postData(`hotel/${hotelId}/orders`, {
          table_id: tableId,
          items,
          total_amount,
          payment_mode,
          customer_id: 1,
        });
        setActiveOrders((prev) => [...prev, order]);
      } catch (error) {
        console.error("Error creating order:", error);
        throw error;
      }
    },
    [hotelId, tableId]
  );

  const updateOrder = useCallback(
    async (orderId: number, items: { item_id: number; quantity: number; price: number }[]) => {
      if (!hotelId) throw new Error("No hotelId set");
      
      try {
        const order = await postData(`hotel/${hotelId}/orders/${orderId}`, { items });
        setActiveOrders((prev) =>
          prev.map((o) => (o.order_id === order.order_id ? { ...o, ...order } : o))
        );
      } catch (error) {
        console.error("Error updating order:", error);
        throw error;
      }
    },
    [hotelId]
  );

  const closeOrder = useCallback(
    async (orderId: number) => {
      if (!hotelId) throw new Error("No hotelId set");
      
      try {
        const order = await postData(`hotel/${hotelId}/orders/${orderId}`, { status: "DELIVERED" });
        setActiveOrders((prev) => prev.filter((o) => o.order_id !== order.order_id));
        setClosedOrders((prev) => [...prev, order]);
      } catch (error) {
        console.error("Error closing order:", error);
        throw error;
      }
    },
    [hotelId]
  );

  const login = useCallback(async (username: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await postData("auth/login", { username, password });

      console.log("Login response:", response);
      const token = response?.access_token;
      
      if (!token) throw new Error("No access token received");

      const decoded: any = jwtDecode(token);
      console.log("Decoded JWT:", decoded);
      
      const hotel = decoded.sub;
      if (!hotel) throw new Error("Invalid login response - no hotel ID in token");

      const hotelIdNum = parseInt(hotel.toString());
      
      // Store token and hotel ID
      localStorage.setItem("access_token", token);
      localStorage.setItem("hotel_id_admin", hotelIdNum.toString());
      
      setHotelIdAdmin(hotelIdNum);
      setHotelId(hotelIdNum);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      // Try to call logout endpoint, but don't fail if it doesn't work
      try {
        await postData("auth/logout", {});
      } catch (err) {
        console.warn("Logout request failed, clearing local storage anyway", err);
      }
      
      // Clear all local storage
      localStorage.removeItem("hotel_id_admin");
      localStorage.removeItem("access_token");
      
      // Reset state
      resetAll();
      setIsAuthenticated(false);
      setHotelIdAdmin(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetAll = useCallback(() => {
    try {
      localStorage.removeItem("hotel_id");
      localStorage.removeItem("table_id");
      localStorage.removeItem("active_orders");
      localStorage.removeItem("closed_orders");
      
      setHotelId(null);
      setTableId(null);
      setActiveOrders([]);
      setClosedOrders([]);
      
      // Safely handle socket disconnection
      try {
        const socket = getSocket();
        socket?.emit("leave_all");
      } catch (socketError) {
        console.warn("Socket disconnect error:", socketError);
      }
    } catch (error) {
      console.error("Reset error:", error);
    }
  }, []);

  return {
    hotelId,
    hotelIdAdmin,
    tableId,
    activeOrders,
    closedOrders,
    createOrder,
    updateOrder,
    closeOrder,
    resetAll,
    login,
    logout,
    isAuthenticated,
    isLoading,
  };
}
