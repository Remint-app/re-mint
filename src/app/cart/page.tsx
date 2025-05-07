'use client';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';
import Link from 'next/link';
import styles from '@/app/style/cart.module.css';

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
    <div className={styles.container}>
      <h1 className={styles.title}>Ваш кошик</h1>

      {items.length === 0 ? (
        <p className={styles.emptyCart}>
          Кошик порожній. <Link href="/market" className={styles.linkToCatalog}>До каталогу</Link>
        </p>
      ) : (
        <>
          <ul className={styles.cartList}>
            {items.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.name} className={styles.cartImage} />
                <div className={styles.itemDetails}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemPrice}>${item.price}</p>
                  <button className={styles.removeButton} onClick={() => removeFromCart(item.id)}>
                    Видалити
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.paymentOptions}>
            <label className={styles.cryptoCheckboxLabel}>
              <input
                type="checkbox"
                checked={payWithCrypto}
                onChange={(e) => setPayWithCrypto(e.target.checked)}
                className={styles.cryptoCheckbox}
              />
              {' '}Оплатити криптовалютою
            </label>
          </div>

          <p className={styles.total}>Загальна сума: <span className={styles.totalAmount}>${total}</span></p>

          <button className={styles.checkoutButton} onClick={handleCheckout}>
            Оплатити
          </button>
        </>
      )}
    </div>
  );
}