'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from '@/app/style/order.module.css';

interface OrderData {
  _id: string;
  items: { name: string; price: number; image?: string }[];
  createdAt: string;
  [key: string]: any; 
}

export default function OrderPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/order?id=${id}`);
        const data = await res.json();
        if (data.success) {
          setOrder(data.order);
        } else {
          console.error('Order not found');
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <p className={styles.loading}>Завантаження...</p>;
  }

  if (!order) {
    return <p className={styles.error}>Замовлення не знайдено</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ваше замовлення</h1>
      <p className={styles.orderId}>ID: {order._id}</p>
      <p className={styles.orderDate}>
        Дата: {new Date(order.createdAt).toLocaleString()}
      </p>

      <ul className={styles.cartList}>
        {order.items?.map((item, index) => (
          <li key={index} className={styles.cartItem}>
            {item.image && <img src={item.image} alt={item.name} className={styles.cartImage} />}
            <div className={styles.itemDetails}>
              <p className={styles.itemName}>{item.name}</p>
              <p className={styles.itemPrice}>${item.price}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className={styles.total}>
        Сума:{' '}
        <span className={styles.totalAmount}>
          ${order.items?.reduce((sum, item) => sum + item.price, 0)}
        </span>
      </p>

      <Link href="/market" className={styles.linkToCatalog}>
        Назад до каталогу
      </Link>
    </div>
  );
}
