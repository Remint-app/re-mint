# remint-lib Smart Contract (Anchor/Solana)

Anchor-программа для чеков, оплаты и NFT-квитанций на Solana.

## Возможности (MVP)
- Приём оплаты (SOL)
- Сохранение заказа (id, адрес, сумма, время)
- Минтинг NFT-квитанции (или вызов внешнего сервиса)
- Получение статуса заказа/чека по id

## Структура
```
program/
  src/
    lib.rs         # основной код контракта
  Cargo.toml
  Anchor.toml
  README.md
```

## TODO
- [ ] Реализация PDA для заказов
- [ ] Инструкция для оплаты и создания чека
- [ ] Инструкция для минтинга NFT
- [ ] Тесты 