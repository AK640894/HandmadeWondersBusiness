export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: 'earrings' | 'nameplates';
  options?: {
    name: string;
    values: string[];
  };
}

export interface CartItem extends Product {
  quantity: number;
  selectedOption?: string;
}

export type View =
  | { name: 'home' }
  | { name: 'earrings' }
  | { name: 'nameplates' }
  | { name: 'product'; product: Product }
  | { name: 'nameplate'; product: Product }
  | { name: 'cart' }
  | { name: 'checkout' }
  | { name: 'about' }
  | { name: 'all-products' }
  | { name: 'login' }
  | { name: 'my-orders' };