
export interface Medicine {
  id: string;
  name: string;
  category: string;
  price?: number;
  description: string;
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export interface Order {
  id: string;
  timestamp: number;
  type: 'prescription' | 'cart';
  items?: CartItem[];
  imageUrl?: string;
  deliveryAddress: string;
  distance: string;
  deliveryCharge: number;
  paymentMethod: string;
  senderNumber: string;
  lastThreeDigits: string;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
}

export enum Page {
  HOME = 'home',
  SEARCH = 'search',
  UPLOAD = 'upload',
  CART = 'cart',
  CALL = 'call',
  ADMIN = 'admin'
}

export const MIN_ORDER_AMOUNT = 200;
