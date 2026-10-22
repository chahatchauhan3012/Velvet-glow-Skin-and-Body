export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'cosmetics' | 'skincare' | 'haircare';
  image: string;
  description: string;
  rating: number;
  reviewsCount: number;
  benefits: string[];
  ingredients: string[];
  howToUse: string;
  shades?: string[];
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedShade?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  author: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
