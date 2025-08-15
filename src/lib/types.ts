
export interface Review {
  user: string;
  avatar: string;
  rating: number;
  comment: string;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: 'Appetizer' | 'Main Course' | 'Dessert' | 'Beverage';
  images: string[];
  reviewCount: number;
  reviews: Review[];
}

export interface Order {
    id: string;
    items: any[]; // You might want to type this more strictly, e.g., CartItem[]
    total: number;
    date: string;
    status: 'Active' | 'Closed';
}
