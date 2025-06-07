'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/style/order.module.css';

export default function OrderSearchPage() {
  const router = useRouter();
  const [orderId, setOrderId] = useState('');

  const handleOrderIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId) {
      router.push(`/order/${orderId}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Перегляд замовлення</h1>
      
      <form onSubmit={handleOrderIdSubmit} className={styles.orderIdForm}>
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Введіть ID замовлення"
          className={styles.orderIdInput}
        />
        <button type="submit" className={styles.orderIdButton}>
          Знайти
        </button>
      </form>

      <p className={styles.instruction}>
        Введіть ID замовлення вище, щоб переглянути його деталі
      </p>
    </div>
  );
} 