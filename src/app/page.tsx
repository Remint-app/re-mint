"use client"
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  const { publicKey } = useWallet();

  return (
    <>
      <Head>
        <title>NFT Receipt — Цифрові чеки</title>
        <meta name="description" content="Цифрові чеки та гарантії у вигляді NFT. Web3 архів покупок на Solana." />
      </Head>

      <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            NFT Receipt
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Цифрові чеки та гарантії на Solana. Архів покупок, пошук, переоформлення — все у твоєму гаманці.
          </p>          

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/mint">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg shadow">
                Створити чек
              </button>
            </Link>
            <Link href="/archive">
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-6 py-3 rounded-xl text-lg shadow">
                Архів чеків
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
