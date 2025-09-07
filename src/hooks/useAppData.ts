"use client";

import { useEffect, useState, useCallback } from "react";
import { getSocket } from "@/lib/socket";
import { getData, postData } from "@/lib/api";

export interface Order {
  order_id: number; // Changed from id: string
  items: { item_id: number; quantity: number; price: number }[];
  total_amount: number; // Changed from total
  status:
    | "PENDING"
    | "CONFIRMED"
    | "PREPARING"
    | "READY"
    | "DELIVERED"
    | "CANCELLED"; // Changed to match OrderStatus enum
  created_at: string; // Changed from date
}

interface AppDataHook {
  hotelId: number | null;
  tableId: string | null; // Changed from tableNo
  activeOrders: Order[];
  closedOrders: Order[];
  createOrder: (
    items: { item_id: number; quantity: number; price: number }[],
    total_amount: number,
    payment_mode: string
  ) => Promise<void>;
  updateOrder: (
    orderId: number,
    items: { item_id: number; quantity: number; price: number }[]
  ) => Promise<void>;
  closeOrder: (orderId: number) => Promise<void>;
  resetAll: () => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export function useAppData(): AppDataHook {
  const [hotelId, setHotelId] = useState<number | null>(() => {
    const saved = localStorage.getItem("hotel_id");
    return saved ? parseInt(saved) : null;
  });
  const [tableId, setTableId] = useState<string | null>(() =>
    localStorage.getItem("table_id")
  );
  const [activeOrders, setActiveOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("active_orders");
    return saved ? JSON.parse(saved) : [];
  });
  const [closedOrders, setClosedOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("closed_orders");
    return saved ? JSON.parse(saved) : [];
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!localStorage.getItem("access_token")
  );

  // ---- Local Storage Sync ----
  useEffect(() => {
    if (hotelId) localStorage.setItem("hotel_id", hotelId.toString());
    else localStorage.removeItem("hotel_id");
    if (tableId) localStorage.setItem("table_id", tableId);
    else localStorage.removeItem("table_id");
    localStorage.setItem("active_orders", JSON.stringify(activeOrders));
    localStorage.setItem("closed_orders", JSON.stringify(closedOrders));
  }, [hotelId, tableId, activeOrders, closedOrders]);

  // ---- WebSocket Handling ----
  useEffect(() => {
    const socket = getSocket();
    if (hotelId && tableId) {
      socket.emit("join_hotel", { hotelId, tableId });
    }

    socket.on("orderCreated", (order: Order) => {
      setActiveOrders((prev) => [...prev, order]);
    });

    socket.on("orderUpdated", (order: Order) => {
      setActiveOrders((prev) =>
        prev.map((o) =>
          o.order_id === order.order_id ? { ...o, ...order } : o
        )
      );
    });

    socket.on("orderUpdated", (order: Order) => {
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
    async (
      items: { item_id: number; quantity: number; price: number }[],
      total_amount: number,
      payment_mode: string
    ) => {
      if (!hotelId) throw new Error("No hotelId set");
      const order = await postData(`hotel/${hotelId}/orders`, {
        table_id: tableId,
        items,
        total_amount,
        payment_mode,
        customer_id: 1, // Placeholder; adjust based on auth
      });
      setActiveOrders((prev) => [...prev, order]);
    },
    [hotelId, tableId]
  );

  const updateOrder = useCallback(
    async (
      orderId: number,
      items: { item_id: number; quantity: number; price: number }[]
    ) => {
      if (!hotelId) throw new Error("No hotelId set");
      const order = await postData(`hotel/${hotelId}/orders/${orderId}`, {
        items,
      });
      setActiveOrders((prev) =>
        prev.map((o) =>
          o.order_id === order.order_id ? { ...o, ...order } : o
        )
      );
    },
    [hotelId]
  );

  const closeOrder = useCallback(
    async (orderId: number) => {
      if (!hotelId) throw new Error("No hotelId set");
      const order = await postData(`hotel/${hotelId}/orders/${orderId}`, {
        status: "DELIVERED",
      });
      setActiveOrders((prev) =>
        prev.filter((o) => o.order_id !== order.order_id)
      );
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
