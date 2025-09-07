'use client';

import { useEffect, useState, useCallback } from "react";
import { getSocket } from "@/lib/socket";
import { getData, postData } from "@/lib/api";

export interface Order {
  order_id: number;
  items: { item_id: number; quantity: number; price: number }[];
  total_amount: number;
  status:
    | "PENDING"
    | "CONFIRMED"
    | "PREPARING"
    | "READY"
    | "DELIVERED"
    | "CANCELLED";
  created_at: string;
}

interface AppDataHook {
  hotelId: number | null;
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
}

export function useAppData(): AppDataHook {
  const [hotelId, setHotelId] = useState<number | null>(null);
  const [tableId, setTableId] = useState<string | null>(null);
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [closedOrders, setClosedOrders] = useState<Order[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // ---- Initialize from localStorage on client ----
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedHotelId = localStorage.getItem("hotel_id");
      const savedTableId = localStorage.getItem("table_id");
      const savedActiveOrders = localStorage.getItem("active_orders");
      const savedClosedOrders = localStorage.getItem("closed_orders");
      const token = localStorage.getItem("access_token");

      setHotelId(savedHotelId ? parseInt(savedHotelId) : null);
      setTableId(savedTableId);
      setActiveOrders(savedActiveOrders ? JSON.parse(savedActiveOrders) : []);
      setClosedOrders(savedClosedOrders ? JSON.parse(savedClosedOrders) : []);
      setIsAuthenticated(!!token);
    }
  }, []);

  // ---- Sync to localStorage whenever data changes ----
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (hotelId !== null) localStorage.setItem("hotel_id", hotelId.toString());
    else localStorage.removeItem("hotel_id");

    if (tableId) localStorage.setItem("table_id", tableId);
    else localStorage.removeItem("table_id");

    localStorage.setItem("active_orders", JSON.stringify(activeOrders));
    localStorage.setItem("closed_orders", JSON.stringify(closedOrders));
  }, [hotelId, tableId, activeOrders, closedOrders]);

  // ---- WebSocket Handling ----
  useEffect(() => {
    if (!hotelId || !tableId) return;
    const socket = getSocket();
    socket.emit("join_hotel", { hotelId, tableId });

    socket.on("orderCreated", (order: Order) => {
      setActiveOrders((prev) => [...prev, order]);
    });

    socket.on("orderUpdated", (order: Order) => {
      setActiveOrders((prev) =>
        prev.map((o) => (o.order_id === order.order_id ? { ...o, ...order } : o))
      );

      if (order.status === "DELIVERED" || order.status === "CANCELLED") {
        setActiveOrders((prev) =>
          prev.filter((o) => o.order_id !== order.order_id)
        );
        setClosedOrders((prev) => [...prev, order]);
      }
    });

    return () => {
      socket.off("orderCreated");
      socket.off("orderUpdated");
    };
  }, [hotelId, tableId]);

  const createOrder = useCallback(
    async (items: { item_id: number; quantity: number; price: number }[], total_amount: number, payment_mode: string) => {
      if (!hotelId) throw new Error("No hotelId set");
      const order = await postData(`hotel/${hotelId}/orders`, {
        table_id: tableId,
        items,
        total_amount,
        payment_mode,
        customer_id: 1,
      });
      setActiveOrders((prev) => [...prev, order]);
    },
    [hotelId, tableId]
  );

  const updateOrder = useCallback(
    async (orderId: number, items: { item_id: number; quantity: number; price: number }[]) => {
      if (!hotelId) throw new Error("No hotelId set");
      const order = await postData(`hotel/${hotelId}/orders/${orderId}`, { items });
      setActiveOrders((prev) =>
        prev.map((o) => (o.order_id === order.order_id ? { ...o, ...order } : o))
      );
    },
    [hotelId]
  );

  const closeOrder = useCallback(
    async (orderId: number) => {
      if (!hotelId) throw new Error("No hotelId set");
      const order = await postData(`hotel/${hotelId}/orders/${orderId}`, { status: "DELIVERED" });
      setActiveOrders((prev) => prev.filter((o) => o.order_id !== order.order_id));
      setClosedOrders((prev) => [...prev, order]);
    },
    [hotelId]
  );

  const login = useCallback(async (username: string, password: string) => {
    const response = await postData("auth/login", { username, password });
    localStorage.setItem("access_token", response.access_token);
    const payload = JSON.parse(atob(response.access_token.split(".")[1]));
    setHotelId(payload.sub);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(async () => {
    await postData("auth/logout", {});
    localStorage.removeItem("access_token");
    resetAll();
    setIsAuthenticated(false);
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
    const socket = getSocket();
    socket.emit("leave_all");
  }, []);

  return {
    hotelId,
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
  };
}

