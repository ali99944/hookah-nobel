import { Product } from "@/features/products/types/product";

export interface CartItem {
  id: number; // This might be the cart_item id from DB
  product_id: number;
  quantity: number;
  product: Product; // Assuming backend returns the product relation
  total: number;
}

export interface CartResponse {
  data: CartItem[];
  meta?: {
    total_price: number;
    count: number;
  };
}

// Payload types for mutations
export interface AddToCartPayload {
  product_id: number;
  quantity: number;
}

export interface UpdateCartPayload {
  product_id: number;
  quantity: number;
}