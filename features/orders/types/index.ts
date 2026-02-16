export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  id: number;
  product_id: number | null;
  product_name: string;
  quantity: number;
  price: number;
  cover_image: string | null;
  line_total: number;
}

export interface Order {
  id: number;
  subtotal: number;
  shipping_cost: number;
  fees_cost: number;
  total: number;
  status: OrderStatus;
  is_paid: boolean;
  tracking_code: string | null;
  tracking_number: string | null;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  address: string;
  city: string;
  notes: string | null;
  items: OrderItem[];
  created_at: string;
}

export interface CreateOrderPayload {
  customer_name: string;
  customer_email?: string;
  customer_phone: string;
  address: string;
  city: string;
  notes?: string;
}

export interface CreateOrderResponse {
  message: string;
  tracking_code: string;
  tracking_number: string;
  data: Order;
}
