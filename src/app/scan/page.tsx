'use client';

import { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import styles from '@/app/style/cart.module.css';
import { useRouter } from 'next/navigation';

export default function ScanPage() {
  const [orderId, setOrderId] = useState('');
  const [showQR, setShowQR] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    }, false);

    scanner.render(onScanSuccess, onScanError);

    function onScanSuccess(decodedText: string) {
      
      scanner.clear();
      
     
      const match = decodedText.match(/\/order\/([^\/]+)/);
      if (match && match[1]) {
        router.push(`/order/${match[1]}`);
      }
    }

    function onScanError(error: any) {
      
      console.warn(`QR Code scan error: ${error}`);
    }

    
    return () => {
      scanner.clear();
    };
  }, [router]);

  const handleGenerateQR = () => {
    if (!orderId.trim()) return;
    setShowQR(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Сканувати чек</h1>
      
      <div id="reader" className={styles.qrScanner}></div>

      <div className={styles.divider}>
        <span>або</span>
      </div>

      <input
        type="text"
        placeholder="Введіть ID замовлення"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        className={styles.input}
      />
      <button className={styles.checkoutButton} onClick={handleGenerateQR}>
        Згенерувати QR
      </button>

      {showQR && (
        <div className={styles.qrContainer}>
          <p>Відскануйте код, щоб переглянути чек:</p>
          <QRCodeCanvas value={`http://localhost:3000/order/${orderId}`} size={200} />
          <p>
            або <a href={`/order/${orderId}`} className={styles.linkToCatalog}>перейти вручну</a>
          </p>
        </div>
      )}
    </div>
  );
}
