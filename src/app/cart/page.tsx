'use client';
import { useCartStore } from '@/store/cartStore';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/app/style/cart.module.css';
import * as QRCode from 'qrcode.react';
import { v4 as uuidv4 } from 'uuid';

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCartStore();
  const [payWithCrypto, setPayWithCrypto] = useState(false);
  const [solPrice, setSolPrice] = useState(0);
  const [showQR, setShowQR] = useState(false);
  const [orderId, setOrderId] = useState('');

  const totalUSD = items.reduce((sum, item) => sum + item.price, 0);
  const totalSOL = solPrice ? (totalUSD / solPrice).toFixed(3) : '...';

  useEffect(() => {
    if (payWithCrypto) {
      
      const randomRate = Math.floor(Math.random() * (180 - 145 + 1)) + 145;
      setSolPrice(randomRate);
    }
  }, [payWithCrypto]);

  const handleCheckout = () => {
    if (items.length === 0) return;

    if (payWithCrypto) {
      const id = uuidv4();
      setOrderId(id);      
      setShowQR(true);      
      //clearCart();
    } else {
      alert('Оплата доларами виконана!');
      clearCart();
    }
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
                onChange={(e) => {
                  setPayWithCrypto(e.target.checked);
                  setShowQR(false); 
                }}
                className={styles.cryptoCheckbox}
              />
              {' '}Оплатити криптовалютою
            </label>

            {payWithCrypto && (
              <div className={styles.cryptoInfo}>
                <p>Курс: <strong>1 SOL = ${solPrice}</strong></p>
                <p>До оплати: <strong>{totalSOL} SOL</strong></p>
                <p>Після підтвердження буде створено цифровий чек у вигляді NFT</p>
              </div>
            )}
          </div>

          <p className={styles.total}>Загальна сума: <span className={styles.totalAmount}>${totalUSD}</span></p>

          {!showQR ? (
            <button className={styles.checkoutButton} onClick={handleCheckout}>
              Оплатити
            </button>
          ) : (
            <div className={styles.qrContainer}>
              <p>Оплату прийнято! Ваш чек (NFT-квитанція):</p>
              <QRCode.QRCodeCanvas value={`http://localhost:3000/order/${orderId}`} size={200} />
              <p>
                <Link href={`/order/${orderId}`} className={styles.linkToCatalog}>
                  Перейти до квитанції
                </Link>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
