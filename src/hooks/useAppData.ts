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
  addOrderItem: (orderId: number, item: { item_id: number; quantity: number; price?: number }) => Promise<void>;
  addMultipleOrderItems: (orderId: number, items: { item_id: number; quantity: number; price?: number }[]) => Promise<void>;
  reorderOrder: (orderId: number, tableId: string) => Promise<void>;
  markTableOccupied: (tableId: string) => Promise<void>;
  markTableFree: (tableId: string) => Promise<void>;
  fetchTableOrders: (tableId: string) => Promise<Order[]>;
  fetchDashboardOrders: () => Promise<Order[]>;
  fetchTableStatuses: () => Promise<{ table_id: string; status: string }[]>;
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

  // Initialize from localStorage
  useEffect(() => {
    if (typeof window === "undefined" || isInitialized) return;
    try {
      setIsLoading(true);
      const savedHotelId = localStorage.getItem("hotel_id");
      const savedHotelIdAdmin = localStorage.getItem("hotel_id_admin");
      const savedTableId = localStorage.getItem("tableId");
      const savedActiveOrders = localStorage.getItem("active_orders");
      
      const savedClosedOrders = localStorage.getItem("closed_orders");

      if (savedActiveOrders) {
  const parsedOrders = JSON.parse(savedActiveOrders);

  setActiveOrders(parsedOrders);
}


      setHotelId(savedHotelId ? parseInt(savedHotelId) : null);
      setHotelIdAdmin(savedHotelIdAdmin ? parseInt(savedHotelIdAdmin) : null);
      setTableId(savedTableId);
      // setActiveOrders(JSON.parse(savedActiveOrders));
      // console.log("orders:",activeOrders)
      setClosedOrders(savedClosedOrders ? JSON.parse(savedClosedOrders) : []);
      setIsAuthenticated(!!savedHotelIdAdmin);
      setIsInitialized(true);
    } catch (err) {
      console.error("Error restoring state from localStorage", err);
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  // Sync to localStorage
  useEffect(() => {
    if (typeof window === "undefined" || !isInitialized) return;
    try {
      if (hotelId !== null) localStorage.setItem("hotel_id", hotelId.toString());
      else localStorage.removeItem("hotel_id");

      if (hotelIdAdmin !== null) localStorage.setItem("hotel_id_admin", hotelIdAdmin.toString());
      else localStorage.removeItem("hotel_id_admin");

      if (tableId) localStorage.setItem("table_id", tableId);
      else localStorage.removeItem("table_id");

      localStorage.setItem("active_orders", JSON.stringify(activeOrders));
      localStorage.setItem("closed_orders", JSON.stringify(closedOrders));
    } catch (err) {
      console.error("Error saving state to localStorage", err);
    }
  }, [hotelId, hotelIdAdmin, tableId, activeOrders, closedOrders, isInitialized]);

  // === ACTIONS ===

  const createOrder = useCallback(async (items, total_amount, payment_mode) => {
  console.log(hotelId,tableId)
    if (!hotelId || !tableId) throw new Error("Missing hotelId or tableId");
    const order = await postData('orders', {
      hotelId,
      tableId,
      items,
      total_amount,
      payment_mode
    });
    setActiveOrders(prev => [...prev, order]);
  }, [hotelId, tableId]);

  const updateOrder = useCallback(async (orderId, items) => {
    if (!hotelId || !tableId) throw new Error("Missing hotelId or tableId");
    const order = await postData(`orders/${orderId}/items/bulk`, {
      hotelId,
      tableId,
      items
    });
    setActiveOrders(prev =>
      prev.map(o => (o.order_id === order.order_id ? { ...o, ...order } : o))
    );
  }, [hotelId, tableId]);

  const closeOrder = useCallback(async (orderId) => {
    if (!hotelId || !tableId) throw new Error("Missing hotelId or tableId");
    const order = await postData(`orders/${orderId}/status`, {
      hotelId,
      tableId,
      status: "DELIVERED"
    });
    setActiveOrders(prev => prev.filter(o => o.order_id !== order.order_id));
    setClosedOrders(prev => [...prev, order]);
  }, [hotelId, tableId]);

  const addOrderItem = useCallback(async (orderId, item) => {
    if (!hotelId || !tableId) throw new Error("Missing hotelId or tableId");
    const order = await postData(`orders/${orderId}/items`, {
      hotelId,
      tableId,
      itemId: item.item_id,
      qty: item.quantity,
      price: item.price
    });
    setActiveOrders(prev =>
      prev.map(o => (o.order_id === order.order_id ? { ...o, ...order } : o))
    );
  }, [hotelId, tableId]);

  const addMultipleOrderItems = useCallback(async (orderId, items) => {
    if (!hotelId || !tableId) throw new Error("Missing hotelId or tableId");
    const order = await postData(`orders/${orderId}/items/bulk`, {
      hotelId,
      tableId,
      items
    });
    setActiveOrders(prev =>
      prev.map(o => (o.order_id === order.order_id ? { ...o, ...order } : o))
    );
  }, [hotelId, tableId]);

  const reorderOrder = useCallback(async (orderId, newTableId) => {
    if (!hotelId) throw new Error("Missing hotelId");
    const order = await postData(`orders/${orderId}/reorder`, {
      hotelId,
      tableId: newTableId
    });
    setActiveOrders(prev => [...prev, order]);
  }, [hotelId]);

  const createDraftOrder = useCallback(async (items) => {
  if (!hotelId || !tableId) throw new Error("Missing hotelId or tableId");
  const order = await postData("orders/draft", {
    hotelId,
    tableId,
    items,
  });
  setActiveOrders((prev) => [...prev, order]);
}, [hotelId, tableId]);


  const markTableOccupied = useCallback(async (tableId: string) => {
    if (!hotelId) throw new Error("Missing hotelId");
    await postData("tables/occupy", { hotelId, tableId });
  }, [hotelId]);

  const markTableFree = useCallback(async (tableId: string) => {
    if (!hotelId) throw new Error("Missing hotelId");
    await postData("tables/free", { hotelId, tableId });
  }, [hotelId]);

  const fetchTableOrders = useCallback(async (tableId: string) => {
    if (!hotelId) throw new Error("Missing hotelId");
    return await getData(`orders/table?hotelId=${hotelId}&tableId=${tableId}`);
  }, [hotelId]);

  const fetchDashboardOrders = useCallback(async () => {
    if (!hotelIdAdmin) throw new Error("Missing admin hotel ID");
    return await getData(`orders?hotelId=${hotelIdAdmin}`);
  }, [hotelIdAdmin]);

  const fetchTableStatuses = useCallback(async () => {
    if (!hotelIdAdmin) throw new Error("Missing admin hotel ID");
    return await getData(`tables/statuses?hotelId=${hotelIdAdmin}`);
  }, [hotelIdAdmin]);

  const login = useCallback(async (username: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await postData("auth/login", { username, password });
      const token = response?.access_token;
      if (!token) throw new Error("No access token received");
      const decoded: any = jwtDecode(token);
      const hotelIdNum = parseInt(decoded.sub);
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
      try {
        await postData("auth/logout", {});
      } catch (err) {
        console.warn("Logout request failed", err);
      }
      localStorage.removeItem("hotel_id_admin");
      localStorage.removeItem("access_token");
      resetAll();
      setIsAuthenticated(false);
      setHotelIdAdmin(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetAll = useCallback(() => {
    localStorage.removeItem("hotel_id");
    localStorage.removeItem("table_id");
    localStorage.removeItem("active_orders");
    localStorage.removeItem("closed_orders");
    setHotelId(null);
    setTableId(null);
    setActiveOrders([]);
    setClosedOrders([]);
    try {
      const socket = getSocket();
      socket?.emit("leave_all");
    } catch (err) {
      console.warn("Socket disconnect error:", err);
    }
  }, []);

  return {
    hotelId,
    hotelIdAdmin,
    tableId,
    activeOrders,
    closedOrders,
    createOrder,
     createDraftOrder,
    updateOrder,
    closeOrder,
    addOrderItem,
    addMultipleOrderItems,
    reorderOrder,
    markTableOccupied,
    markTableFree,
    fetchTableOrders,
    fetchDashboardOrders,
    fetchTableStatuses,
    resetAll,
    login,
    logout,
    isAuthenticated,
    isLoading,
  };
}

