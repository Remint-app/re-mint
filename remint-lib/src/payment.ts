import { Order, PaymentResult } from './types';

export function processCryptoPayment(order: Order): Promise<PaymentResult> {
  
  return Promise.resolve({
    success: true,
    txId: 'demo-tx-id',
    orderId: order.id,
  });
} 