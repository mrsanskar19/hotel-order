
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

};

export interface Order {
    id: string;
    items: any[]; // You might want to type this more strictly, e.g., CartItem[]
    total: number;
    date: string;
    status: 'Active' | 'Closed';
}
