'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),
      removeFromCart: (id) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === id);
          if (existingItem && existingItem.quantity > 1) {
            return {
              items: state.items.map((i) =>
                i.id === id
                  ? { ...i, quantity: i.quantity - 1 }
                  : i
              ),
            };
          }
          return { items: state.items.filter((i) => i.id !== id) };
        }),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id
              ? { ...i, quantity: Math.max(0, quantity) }
              : i
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'nft-receipt-cart',
    }
  )
);
