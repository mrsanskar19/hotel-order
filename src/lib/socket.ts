import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/^http/, "ws");
    if (!baseUrl) throw new Error("NEXT_PUBLIC_SERVER_URL is not defined");

    socket = io(baseUrl, {
      transports: ["websocket"],
      autoConnect: true,
    });

    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket:", socket?.id);

      // auto rejoin hotel + table if stored
      const hotelId = localStorage.getItem("hotel_id");
      const tableNo = localStorage.getItem("table_no");

      if (hotelId) {
        socket?.emit("join_hotel", { hotelId: Number(hotelId), tableNo });
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from WebSocket");
    });
  }

  return socket;
};

