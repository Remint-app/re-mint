# remint-lib

**remint-lib** — библиотека для интеграции чеков, оплаты и NFT-расписок на Solana в сторонние проекты. Аналог Stripe SDK, но для крипто/чеков.

## Возможности
- Создание заказа (order)
- Генерация QR-кода для оплаты/чека
- Минтинг NFT-квитанции (receipt)
- API для интеграции с backend и frontend

## Структура
```
remint-lib/
  src/
    index.ts
    order.ts
    payment.ts
    qrcode.ts
    nft.ts
    types.ts
  package.json
  README.md
  tsconfig.json
```

## Пример использования
```ts
import { createOrder, generateQRCode, mintReceiptNFT } from 'remint-lib';

const order = await createOrder({ items, buyerAddress });
const qr = generateQRCode(`https://your-site.com/order/${order.id}`);
const nft = await mintReceiptNFT({ order, image: qr, recipient: buyerAddress });
```

## TODO
- [ ] Реализация ядра order/payment/qrcode/nft
- [ ] Документация по API
- [ ] Примеры интеграции
- [ ] Публикация в npm 