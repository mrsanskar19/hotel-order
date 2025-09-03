// hooks/useAppData.ts
"use client";

import { useEffect, useState, useCallback } from "react";
import { getSocket } from "@/lib/socket";
import { getData, postData } from "@/lib/api";

export interface Order {
  id: string;
  items: any[];
  total: number;
  status: "Active" | "Closed";
  date: string;
}

interface AppDataHook {
  hotelId: string | null;
  tableNo: string | null;
  activeOrders: Order[];
  closedOrders: Order[];
  createOrder: (items: any[], total: number) => Promise<void>;
  updateOrder: (orderId: string, items: any[]) => Promise<void>;
  closeOrder: (orderId: string) => Promise<void>;
  resetAll: () => void;
}

export function useAppData(): AppDataHook {
  const [hotelId, setHotelId] = useState<string | null>(
    () => localStorage.getItem("hotel_id")
  );
  const [tableNo, setTableNo] = useState<string | null>(
    () => localStorage.getItem("table_no")
  );
  const [activeOrders, setActiveOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("active_orders");
    return saved ? JSON.parse(saved) : [];
  });
  const [closedOrders, setClosedOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("closed_orders");
    return saved ? JSON.parse(saved) : [];
  });

  // ---- Local Storage Sync ----
  useEffect(() => {
    if (hotelId) localStorage.setItem("hotel_id", hotelId);
    if (tableNo) localStorage.setItem("table_no", tableNo);
    localStorage.setItem("active_orders", JSON.stringify(activeOrders));
    localStorage.setItem("closed_orders", JSON.stringify(closedOrders));
  }, [hotelId, tableNo, activeOrders, closedOrders]);

  // ---- WebSocket Handling ----
  useEffect(() => {
    const socket = getSocket();
    if (hotelId) socket.emit("join_hotel", { hotelId, tableNo });

    socket.on("order_created", (order: Order) => {
      setActiveOrders((prev) => [...prev, order]);
    });

    socket.on("order_updated", (order: Order) => {
      setActiveOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, ...order } : o))
      );
    });

    socket.on("order_closed", (order: Order) => {
      setActiveOrders((prev) => prev.filter((o) => o.id !== order.id));
      setClosedOrders((prev) => [...prev, order]);
    });

    return () => {
      socket.off("order_created");
      socket.off("order_updated");
      socket.off("order_closed");
    };
  }, [hotelId, tableNo]);

  // ---- API Functions ----
  const createOrder = useCallback(
    async (items: any[], total: number) => {
      if (!hotelId) throw new Error("No hotelId set");
      const order = await postData(`/hotels/${hotelId}/orders`, {
        table_no: tableNo,
        items,
        total,
      });
      setActiveOrders((prev) => [...prev, order]);
    },
    [hotelId, tableNo]
  );

  const updateOrder = useCallback(
    async (orderId: string, items: any[]) => {
      if (!hotelId) throw new Error("No hotelId set");
      const order = await postData(`/hotels/${hotelId}/orders/${orderId}`, {
        items,
      });
      setActiveOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, ...order } : o))
      );
    },
    [hotelId]
  );

  const closeOrder = useCallback(
    async (orderId: string) => {
      if (!hotelId) throw new Error("No hotelId set");
      const order = await postData(
        `/hotels/${hotelId}/orders/${orderId}/close`,
        {}
      );
      setActiveOrders((prev) => prev.filter((o) => o.id !== order.id));
      setClosedOrders((prev) => [...prev, order]);
    },
    [hotelId]
  );

  // ---- Reset Everything ----
  const resetAll = useCallback(() => {
    localStorage.removeItem("hotel_id");
    localStorage.removeItem("table_no");
    localStorage.removeItem("active_orders");
    localStorage.removeItem("closed_orders");
    setHotelId(null);
    setTableNo(null);
    setActiveOrders([]);
    setClosedOrders([]);

    const socket = getSocket();
    socket.emit("leave_all");
  }, []);

  return {
    hotelId,
    tableNo,
    activeOrders,
    closedOrders,
    createOrder,
    updateOrder,
    closeOrder,
    resetAll,
  };
}

