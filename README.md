# 🧾 ReMint (Demo)

**ReMint** — a demo project for creating digital receipts as NFTs after cryptocurrency payments in **Solana (SOL)**. The receipt contains a QR code and a link to the order page.

##  About the Project

This is a demo version. The final product will be available as:

>  **Library/Plugin** for integrating crypto payments with NFT receipts on Solana

## Features
- 🛒 Shopping cart with items
- 💰 Payment in USD/SOL
- 📊 Dynamic SOL exchange rate
- 🔳 QR code generation
- 🎨 NFT minting via Metaplex
- 💾 Storage on Arweave

## 🛠 Technologies
- **Next.js** (App Router)
- **Solana** `web3.js`
- **Metaplex JS SDK**
- **Arweave/Bundlr**
- **TypeScript**
- **CSS Modules**

## Project Structure

##  Структура проекту
```\
├── 📁 src/
│ ├── 📁 app/
│ │ ├── 📁 api/
│ │ ├── 📁 cart/
│ │ ├── 📁 market/  
│ │ ├── 📁 style/
│ │ ├── 📁 market/
│ │ ├── layout.tsx
│ │ └── page.tsx
│ ├── 📁 components/
│ └── 📁 store/
```

## remint-lib (SDK)

В корне проекта будет создана папка `remint-lib` — это будущая npm-библиотека для интеграции чеков, оплаты и NFT-расписок в сторонние проекты (аналог Stripe SDK, но для крипто/чеков).

- Исходный код: `/remint-lib/src/`
- Документация: `/remint-lib/README.md`
- Сборка: npm/yarn/pnpm build внутри папки

---


