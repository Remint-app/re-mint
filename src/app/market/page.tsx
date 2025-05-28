'use client';
import { useCartStore } from '@/store/cartStore';
import styles from '@/app/style/market.module.css';
import { AiOutlineShoppingCart } from 'react-icons/ai'; 

const products = [
  {
    id: '1',
    name: 'Ноутбук Lenovo',
    price: 799,
    image: 'https://files.foxtrot.com.ua/PhotoNew/img_0_58_27478_0_1_HrnbPw.webp',
  },
  {
    id: '2',
    name: 'Навушники Sony',
    price: 199,
    image: 'https://era-in-ear.com/wp-content/uploads/2024/08/386436578.webp',
  },
  {
    id: '3',
    name: 'Смарт-годинник Apple',
    price: 349,
    image: 'https://fs1.secunda.com.ua/photo/goods/popup/405/661831/apple-series-10-mwwf3qh-a-661831-2.jpg',
  },
];

export default function HomePage() {
  const { addToCart, items } = useCartStore();

  const getItemQuantity = (id: string) => {
    const item = items.find(i => i.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Каталог товарів</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <img src={product.image} alt={product.name} className={styles.image} />
            <h2 className={styles.productName}>{product.name}</h2>
            <p className={styles.productPrice}>${product.price}</p>
            <div className={styles.addToCartSection}>
              <button
                className={styles.addToCartButton}
                onClick={() => addToCart(product)}
              >
                <AiOutlineShoppingCart className={styles.cartIcon} /> Додати до кошика
              </button>
              {getItemQuantity(product.id) > 0 && (
                <span className={styles.itemCount}>
                  В кошику: {getItemQuantity(product.id)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}