import { User } from "./User";

export type OrderStatus =
  | "pending"
  | "paid"
  | "confirmed"
  | "shipped"
  | "completed"
  | "cancelled";

export type Order = {
  product_id: number;
  price: number;
  seller: User;
  buyer: User;
  phone_number: number;
  status: OrderStatus;
  shipping_address: string;
  payment_invoice: string | null;
  created_at: Date;
  updated_at: Date | null;
};

export type OrderPayment = {
  product_id: number;
  is_paid: boolean;
  address: string;
  phone_number: string;
};

export type NewOrderRequest = {
  product_id: number;
  price: number;
  shipping_address: string;
};

export type OrderMessage = {
  user: Pick<User, "id" | "name" | "profile_img">;
  message: string;
  created_at: Date;
};

export type OrderMessageV2 = {
  id: number;
  name: string;
  profile_img: string;
  message: string;
  created_at: Date;
};

export type OrderConversation = {
  product_id: number;
  buyer_id: number;
  messages: OrderMessage[];
};

export type NewOrderMessageRequest = {
  message: string;
};
