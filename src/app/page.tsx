'use client';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>NFT Receipt — Цифрові чеки</title>
        <meta name="description" content="Цифрові чеки та гарантії у вигляді NFT. Web3 архів покупок на Solana." />
      </Head>

      <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            NFT Receipt
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Отримайте надійний доказ кожної покупки завдяки технології блокчейн. NFT Receipt перетворює звичайні чеки на унікальні цифрові активи, які завжди будуть з вами у вашому гаманці.
          </p>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Більше не потрібно хвилюватися про втрачені паперові чеки. З NFT Receipt ви отримуєте не лише підтвердження покупки, але й цифровий актив, який можна переглядати, передавати та зберігати.
          </p>
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Демонстрація можливостей</h2>
            <p className="text-md text-gray-600 mb-4">
              На цій сторінці представлено демонстрацію основних функцій NFT Receipt:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li><b>Створення чека:</b> Спробуйте створити цифровий чек у вигляді NFT.</li>
              <li><b>Перегляд архіву:</b> Перегляньте збережені вами цифрові чеки.</li>
            </ul>
            <p className="text-sm text-gray-500">
              Зверніть увагу: це демонстраційна версія, що працює в тестовій мережі.
            </p>
          </div>
          {/* <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
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
          </div> */}
        </div>
      </main>
    </>
  );
}