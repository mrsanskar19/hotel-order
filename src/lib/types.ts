
export interface Review {
  user: string;
  avatar: string;
  rating: number;
  comment: string;
}

export type MenuItem = {
  images: any;
  id: number;
  name: string;
  category_id: string;
  price: number;
  imageUrl: string;
  imageHint?: string;
  customizable?: boolean;
  available: boolean;
  description?: string;
  img?: string;
  rating?: number;
  reviewCount?: number;
  reviews?: Review[];

};

export interface Order {
    id: string;
    order_id: string;
    items: any[]; 
    total: number;
    total_amount: number;
    date: string;
    status: 'Pending' | 'Preparing' | 'Completed' | 'Cancelled' | 'DELIVERED' | 'PREPARING' | 'PENDING' | 'CANCELLED';
    table_id: number | string;
    table?: number | string;
}
