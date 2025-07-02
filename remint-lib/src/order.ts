import { Order, CreateOrderInput, CartItem } from './types';

export function createOrder(input: CreateOrderInput): Promise<Order> {
  
  return Promise.resolve({
    id: 'demo-id',
    items: input.items,
    buyerAddress: input.buyerAddress,
    createdAt: new Date().toISOString(),
    totalPrice: input.items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0),
  });
} 