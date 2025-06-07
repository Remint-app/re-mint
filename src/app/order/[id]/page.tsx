'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '@/app/style/order.module.css';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

interface OrderData {
  _id: string;
  items: OrderItem[];
  totalPrice: number;
  buyerAddress: string;
  createdAt: string;
  [key: string]: any; 
}

export default function OrderPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(id ? true : false);
  const [orderId, setOrderId] = useState(id as string || '');

  const fetchOrder = async (orderId: string) => {
    try {
      const res = await fetch(`/api/order?id=${orderId}`);
      const data = await res.json();
      if (data.success) {
        setOrder(data.order);
      } else {
        console.error('Order not found');
        setOrder(null);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchOrder(id as string);
  }, [id]);

  const handleOrderIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId) {
      router.push(`/order/${orderId}`);
      fetchOrder(orderId);
    }
  };

  if (loading) {
    return <p className={styles.loading}>Завантаження...</p>;
  }

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

      {!id && !order && (
        <p className={styles.instruction}>
          Введіть ID замовлення вище, щоб переглянути його деталі
        </p>
      )}

      {order && (
        <>
          <p className={styles.orderId}>ID: {order._id}</p>
          <p className={styles.buyerAddress}>
            Адреса покупця: {order.buyerAddress}
          </p>
          <p className={styles.orderDate}>
            Дата: {new Date(order.createdAt).toLocaleString()}
          </p>

          <ul className={styles.cartList}>
            {order.items?.map((item, index) => (
              <li key={index} className={styles.cartItem}>
                {item.image && <img src={item.image} alt={item.name} className={styles.cartImage} />}
                <div className={styles.itemDetails}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemPrice}>
                    ${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className={styles.total}>
            Загальна сума:{' '}
            <span className={styles.totalAmount}>
              ${order.totalPrice.toFixed(2)}
            </span>
          </p>

          <Link href="/market" className={styles.linkToCatalog}>
            Назад до каталогу
          </Link>
        </>
      )}
    </div>
  );
}
