export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isAvailable: boolean;
  'data-ai-hint'?: string;
  reviews?: UserReview[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export type PaymentMethod = 'UPI' | 'Card' | 'Cash';

export interface Order {
  items: CartItem[];
  total: number;
  orderDate: string;
  orderNumber: string;
  customerName: string;
  tableNumber: string;
  mobile: string;
  note?: string;
  paymentMethod: PaymentMethod;
  status: 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered';
}

export interface UserReview {
    id: string;
    author: string;
    rating: number; // 1-5
    comment: string;
    date: string;
}

export interface OrderStatus {
    orderNumber: string;
    status: 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered';
    estimatedDeliveryTime: string;
    startTime?: string;
}
