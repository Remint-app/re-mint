'use client';

import React, { useState, useCallback, useRef } from 'react';
import { QrReader } from 'react-qr-reader';

export default function ScanCodePage() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const qrRef = useRef<QrReader>(null);
  const [scanType, setScanType] = useState<'qr' | 'barcode'>('qr');

  const handleScan = useCallback((result: string | null | undefined) => {
    if (result) {
      setScanResult(result || null);
      const textToEncode = result || '';
      const size = 256;
      const url = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(textToEncode)}&size=${size}x${size}`;
      setImageUrl(url);
    }
  }, []);

  const handleError = useCallback((error: any) => {
    console.error(error);
  }, []);

  const handleTorchToggle = () => {
    qrRef.current?.toggleTorch();
  };

  const switchScanType = () => {
    setScanType(prevType => (prevType === 'qr' ? 'barcode' : 'qr'));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Сканер QR та Штрих-кодів</h1>

      <div className="mb-4">
        <button
          onClick={switchScanType}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Переключити на {scanType === 'qr' ? 'Штрих-код' : 'QR-код'}
        </button>
        {/* Перевірка наявності toggleTorch може бути проблематичною без ref */}
        {/* {qrRef.current?.hasTorch && (
          <button
            onClick={handleTorchToggle}
            className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded"
          >
            Ліхтарик
          </button>
        )} */}
      </div>

      <div className="relative w-64 h-64 mb-4">
        <QrReader
          constraints={{ facingMode: 'environment' }}
          onResult={handleScan}
          onError={handleError}
          scanDelay={300}
          legacyMode={false}
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {scanResult && (
        <div className="mt-6 p-4 border rounded shadow-md text-center">
          <h2 className="text-lg font-semibold mb-2">Результат сканування:</h2>
          <p className="mb-2">{scanResult}</p>
          {imageUrl && (
            <div>
              <h3 className="text-md font-semibold mb-1">Зображення коду:</h3>
              <img src={imageUrl} alt="Згенерований код" className="max-w-full h-auto" />
            </div>
          )}
          <button
            onClick={() => {
              alert(`Дані "${scanResult}" та зображення збережено!`);
              setScanResult(null);
              setImageUrl(null);
            }}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Зберегти
          </button>
        </div>
      )}
    </div>
  );
}