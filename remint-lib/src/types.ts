export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CreateOrderInput {
  items: CartItem[];
  buyerAddress: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  buyerAddress: string;
  createdAt: string;
  totalPrice: number;
}

export interface PaymentResult {
  success: boolean;
  txId?: string;
  orderId: string;
  error?: string;
}

export interface NFTReceipt {
  success: boolean;
  nftAddress?: string;
  orderId: string;
  error?: string;
} 