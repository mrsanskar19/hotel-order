import type { MenuItem } from '@/lib/types';

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Crispy Calamari',
    description: 'Tender calamari rings, lightly breaded and fried to golden perfection. Served with a zesty marinara sauce.',
    price: 12.99,
    rating: 4.5,
    reviewCount: 120,
    category: 'Appetizer',
    images: [
        'https://placehold.co/600x400.png',
        'https://placehold.co/600x401.png',
        'https://placehold.co/600x402.png',
    ],
    reviews: [
      {
        user: 'Alice',
        avatar: 'https://placehold.co/48x48.png',
        rating: 5,
        comment: "Absolutely delicious! The calamari was perfectly crispy and not greasy at all. The marinara sauce was a great accompaniment."
      },
      {
        user: 'Bob',
        avatar: 'https://placehold.co/48x48.png',
        rating: 4,
        comment: "Very good, could have been a bit more seasoned for my taste, but still enjoyable."
      }
    ]
  },
  {
    id: 2,
    name: 'Bruschetta al Pomodoro',
    description: 'Toasted ciabatta bread topped with fresh tomatoes, garlic, basil, and a drizzle of extra virgin olive oil.',
    price: 9.99,
    rating: 4.7,
    reviewCount: 95,
    category: 'Appetizer',
    images: [
        'https://placehold.co/600x400.png',
        'https://placehold.co/600x401.png',
    ],
    reviews: [
      {
        user: 'Charlie',
        avatar: 'https://placehold.co/48x48.png',
        rating: 5,
        comment: "The tomatoes were so fresh and flavorful. A perfect start to our meal!"
      },
    ]
  },
  {
    id: 3,
    name: 'Classic Beef Burger',
    description: 'A juicy, all-beef patty with lettuce, tomato, onions, and our special sauce on a toasted brioche bun. Served with fries.',
    price: 15.99,
    rating: 4.8,
    reviewCount: 250,
    category: 'Main Course',
    images: [
        'https://placehold.co/600x400.png',
        'https://placehold.co/600x401.png',
        'https://placehold.co/600x402.png',
        'https://placehold.co/600x403.png',
    ],
    reviews: [
       {
        user: 'David',
        avatar: 'https://placehold.co/48x48.png',
        rating: 5,
        comment: "One of the best burgers I've had in a long time. The patty was cooked to perfection and the sauce is amazing."
      },
      {
        user: 'Eve',
        avatar: 'https://placehold.co/48x48.png',
        rating: 4,
        comment: "Solid burger, great fries. The bun held up well."
      }
    ]
  },
  {
    id: 4,
    name: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta with creamy egg sauce, pancetta, pecorino cheese, and black pepper.',
    price: 17.50,
    rating: 4.9,
    reviewCount: 180,
    category: 'Main Course',
    images: [
        'https://placehold.co/600x400.png',
    ],
    reviews: []
  },
  {
    id: 5,
    name: 'Margherita Pizza',
    description: 'Traditional Neapolitan pizza with San Marzano tomatoes, fresh mozzarella, basil, and a touch of olive oil.',
    price: 14.99,
    rating: 4.6,
    reviewCount: 210,
    category: 'Main Course',
    images: [
        'https://placehold.co/600x400.png',
        'https://placehold.co/600x401.png',
    ],
    reviews: []
  },
  {
    id: 6,
    name: 'Tiramisu',
    description: 'Layers of coffee-soaked ladyfingers and creamy mascarpone, dusted with cocoa powder.',
    price: 8.99,
    rating: 4.9,
    reviewCount: 150,
    category: 'Dessert',
    images: [
        'https://placehold.co/600x400.png',
    ],
    reviews: []
  },
  {
    id: 7,
    name: 'Chocolate Lava Cake',
    description: 'Warm, molten chocolate cake served with a scoop of vanilla bean ice cream.',
    price: 9.50,
    rating: 4.8,
    reviewCount: 130,
    category: 'Dessert',
    images: [
        'https://placehold.co/600x400.png',
        'https://placehold.co/600x401.png',
    ],
    reviews: []
  },
  {
    id: 8,
    name: 'Fresh Lemonade',
    description: 'Hand-squeezed lemonade, perfectly sweet and tart.',
    price: 4.50,
    rating: 4.7,
    reviewCount: 80,
    category: 'Beverage',
    images: [
        'https://placehold.co/600x400.png',
    ],
    reviews: []
  },
];
