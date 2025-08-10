export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isAvailable: boolean;
  'data-ai-hint'?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  items: CartItem[];
  total: number;
  orderDate: string;
  orderNumber: string;
  customerName: string;
  roomNumber: string;
}
