'use client';
import Link from 'next/link';
import styles from '@/app/style/navbar.module.css';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
export default function Navbar() {
  const cartItems = useCartStore((state) => state.items);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    setItemCount(cartItems.length);
  }, [cartItems]);

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/" className={styles.navLink}>
            Головна
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/market" className={styles.navLink}>
            Маркет
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/cart" className={styles.navLink}>
            <div className={styles.cartButton}>
              <AiOutlineShoppingCart className={styles.cartIcon} />
              Кошик
              {itemCount > 0 && (
                <span className={styles.cartCount}>{itemCount}</span>
              )}
            </div>
          </Link>
        </li>
        <li><WalletMultiButton/></li>
      </ul>
    </nav>
  );
}