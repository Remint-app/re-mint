'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Item = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type CartState = {
  items: Item[];
  addToCart: (item: Item) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (item) =>
        set((state) => ({ items: [...state.items, item] })),
      removeFromCart: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'nft-receipt-cart', 
    }
  )
);
