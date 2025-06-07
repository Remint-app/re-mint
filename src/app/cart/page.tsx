'use client';
import { useCartStore } from '@/store/cartStore';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/app/style/cart.module.css';
import * as QRсode from 'qrcode.react';
import { v4 as uuidv4 } from 'uuid';
import { useWallet } from '@solana/wallet-adapter-react';
import QRCode from 'qrcode';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function CartPage() {
  const { items, removeFromCart, clearCart, updateQuantity } = useCartStore();
  const [payWithCrypto, setPayWithCrypto] = useState(false);
  const [solPrice, setSolPrice] = useState(167);
  const [showQR, setShowQR] = useState(false);
  const [orderId, setOrderId] = useState('');
  const wallet = useWallet();

  const totalUSD = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalSOL = solPrice ? (totalUSD / solPrice).toFixed(3) : '...';

  const handleCheckout = async () => {
    if (items.length === 0) return;

    if (payWithCrypto) {
      if (!wallet.connected || !wallet.publicKey) {
        alert('Підключіть гаманець!');
        return;
      }

      try {
        const res = await fetch('/api/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            items,
            buyerAddress: wallet.publicKey?.toBase58()
          }),
        });

        const { id } = await res.json();     

        setOrderId(orderId);
        const qrText = `http://localhost:3000/order/${id}`;
        const imageDataUrl = await QRCode.toDataURL(qrText);
        console.log(qrText)
        
        const mintRes = await fetch('/api/mint-receipt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: `Order-${orderId}`,
            description: `Квитанція про покупку. Деталі: http://localhost:3000/order/${id}`,
            imageDataUrl,
            recipient: wallet.publicKey.toBase58(),
          }),
        });

        const mintResult = await mintRes.json();
        if (mintResult.success) {
          setShowQR(true);
          clearCart();
        } else {
          alert('Помилка при мінті NFT: ' + mintResult.error);
        }
      } catch (err) {
        console.error('Checkout error:', err);
        alert('Невідома помилка. Перевірте консоль.');
      }
    } else {
      alert('Оплата доларами виконана!');
      clearCart();
    }
  };

  return (
    <ProtectedRoute>
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
                    <div className={styles.quantityControls}>
                      <button 
                        className={styles.quantityButton}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className={styles.quantity}>{item.quantity}</span>
                      <button 
                        className={styles.quantityButton}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button className={styles.removeButton} onClick={() => removeFromCart(item.id)}>
                      Видалити
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.checkoutSection}>
              <div className={styles.paymentMethod}>
                <label>
                  <input
                    type="checkbox"
                    checked={payWithCrypto}
                    onChange={(e) => setPayWithCrypto(e.target.checked)}
                  />
                  Оплатити криптовалютою (SOL)
                </label>
              </div>

              <div className={styles.totalSection}>
                <p className={styles.total}>
                  Загальна сума: <span className={styles.totalAmount}>${totalUSD.toFixed(2)}</span>
                </p>
                {payWithCrypto && (
                  <p className={styles.solPrice}>
                    ≈ {totalSOL} SOL
                  </p>
                )}
              </div>

              <button
                className={styles.checkoutButton}
                onClick={handleCheckout}
                disabled={items.length === 0}
              >
                Оформити замовлення
              </button>
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}
