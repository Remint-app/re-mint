'use client';
import { useCartStore } from '@/store/cartStore';

const products = [
  {
    id: '1',
    name: 'Ноутбук ASUS ZenBook',
    price: 999,
    image: 'https://via.placeholder.com/300x200?text=ASUS+ZenBook',
  },
  {
    id: '2',
    name: 'Смарт-годинник Apple Watch',
    price: 399,
    image: 'https://via.placeholder.com/300x200?text=Apple+Watch',
  },
  {
    id: '3',
    name: 'Навушники Sony WH-1000XM4',
    price: 299,
    image: 'https://via.placeholder.com/300x200?text=Sony+Headphones',
  },
];

export default function MarketPage() {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Каталог товарів</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="p-4 border rounded-xl shadow bg-white">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded mb-3" />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-4">${product.price}</p>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              onClick={() => addToCart(product)}
            >
              Додати до кошика
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
