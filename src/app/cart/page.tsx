'use client';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCartStore();
  const [payWithCrypto, setPayWithCrypto] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    if (payWithCrypto) {
      alert('Переходимо до крипто-оплати...');
    } else {
      alert('Оплата доларами...');
    }
    clearCart();
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Ваш кошик</h1>

      {items.length === 0 ? (
        <p>Кошик порожній. <Link href="/" className="text-indigo-600">До каталогу</Link></p>
      ) : (
        <>
          <ul className="mb-6 space-y-6">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-4 border-b pb-4">
                <img src={item.image} alt={item.name} className="w-24 h-16 object-cover rounded" />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => removeFromCart(item.id)}
                >
                  Видалити
                </button>
              </li>
            ))}
          </ul>

          <div className="mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={payWithCrypto}
                onChange={(e) => setPayWithCrypto(e.target.checked)}
              />
              Оплатити криптовалютою
            </label>
          </div>

          <p className="text-xl font-semibold mb-4">Загальна сума: ${total}</p>

          <button
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            onClick={handleCheckout}
          >
            Оплатити
          </button>
        </>
      )}
    </div>
  );
}
