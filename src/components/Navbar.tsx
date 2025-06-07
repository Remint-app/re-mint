'use client';
import Link from 'next/link';
import styles from '@/app/style/navbar.module.css';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { HiMenu } from 'react-icons/hi';

export default function Navbar() {
  const cartItems = useCartStore((state) => state.items);
  const [itemCount, setItemCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setItemCount(cartItems.length);
  }, [cartItems]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <HiMenu size={24} />
      </div>
      <ul className={`${styles.navList} ${isMenuOpen ? styles.active : ''}`}>
        <li className={styles.navItem}>
          <Link href="/" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
            Головна
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/order" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
            Ордер
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/market" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
            Маркет
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/cart" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
            <div className={styles.cartButton}>
              <AiOutlineShoppingCart className={styles.cartIcon} />
              Кошик
              {itemCount > 0 && (
                <span className={styles.cartCount}>{itemCount}</span>
              )}
            </div>
          </Link>
        </li>
        <li className={styles.navItem}>
          <WalletMultiButton />
        </li>
      </ul>
    </nav>
  );
}