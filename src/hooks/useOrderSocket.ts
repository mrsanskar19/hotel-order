import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";

export function useOrderSocket(hotelId?: number, tableNo?: string, userId?: number) {
  const [activeOrder, setActiveOrder] = useState<any>(null);

  useEffect(() => {
    const socket = getSocket();

    // Persist values
    if (hotelId) localStorage.setItem("hotel_id", hotelId.toString());
    if (tableNo) localStorage.setItem("table_no", tableNo);
    if (userId) localStorage.setItem("user_id", userId.toString());

    // Join room
    if (hotelId) {
      socket.emit("join_hotel", { hotelId, tableNo });
    }

    // Check existing active order (REST fallback)
    // if (hotelId && tableNo && userId) {
    //   fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/orders/active?hotelId=${hotelId}&tableNo=${tableNo}&userId=${userId}`)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (data?.order_id) {
    //         setActiveOrder(data);
    //       }
    //     })
    //     .catch(() => console.log("No active order found"));
    // }

    // ✅ Socket listeners
    socket.on("joined", (data) => {
      console.log("✅ Joined room:", data);
    });

    socket.on("new_order", (order) => {
      console.log("📦 New order:", order);
    });

    socket.on("order_created", (order) => {
      console.log("🆕 Order created:", order);
      setActiveOrder(order);
    });

    socket.on("order_updated", (order) => {
      console.log("🔄 Order updated:", order);
      setActiveOrder(order);
    });

    socket.on("order_closed", (order) => {
      console.log("❌ Order closed:", order);
      if (activeOrder && order.order_id === activeOrder.order_id) {
        setActiveOrder(null); // reset if this was the active order
      }
    });

    socket.on("new_message", (msg) => {
      console.log("💬 Chat:", msg);
    });

    return () => {
      socket.off("joined");
      socket.off("new_order");
      socket.off("order_created");
      socket.off("order_updated");
      socket.off("order_closed");
      socket.off("new_message");
    };
  }, [hotelId, tableNo, userId]);

  // 🔑 API for components
  const createOrder = (items: { itemId: number; qty: number; price?: number }[]) => {
    const socket = getSocket();
    if (!hotelId || !userId) return;

    socket.emit("post_order", {
      hotelId,
      tableNo,
      userId,
      items,
    });
  };

  const addItem = (orderId: number, item: { itemId: number; qty: number; price?: number }) => {
    const socket = getSocket();
    socket.emit("add_item", {
      orderId,
      itemId: item.itemId,
      qty: item.qty,
      price: item.price ?? 0,
    });
  };

  const closeOrder = (orderId: number) => {
    const socket = getSocket();
    socket.emit("close_order", { orderId });
  };

  return { activeOrder, createOrder, addItem, closeOrder };
}

