
export interface Category {
  id: string;
  name: string;
  parentId?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  categoryName?: string;
  imageUrl: string;
  images: string[];
  quantity: number;
  stock?: number;
  requested?: number;
}

export interface Order {
  id: string;
  products: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  institution: string;
  address: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  total: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  institution: string;
  address: string;
  wishlist: string[];
}
