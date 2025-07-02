import { Order, NFTReceipt } from './types';

export function mintReceiptNFT({ order, image, recipient }:{ order: Order, image: string, recipient: string }): Promise<NFTReceipt> {
  
  return Promise.resolve({
    success: true,
    nftAddress: 'demo-nft-address',
    orderId: order.id,
  });
} 