'use client';

import { useState, useEffect } from 'react';

interface OrderBookItem {
  price: number;
  amount: number;
  total: number;
}

export default function OrderBook() {
  const [asks, setAsks] = useState<OrderBookItem[]>([]);
  const [bids, setBids] = useState<OrderBookItem[]>([]);

  // Generate mock order book data
  useEffect(() => {
    const generateOrders = (basePrice: number, count: number, isAsk: boolean): OrderBookItem[] => {
      const orders: OrderBookItem[] = [];
      let total = 0;

      for (let i = 0; i < count; i++) {
        const priceOffset = isAsk ? i * 10 : -i * 10;
        const price = basePrice + priceOffset;
        const amount = Math.random() * 2;
        total += amount;

        orders.push({
          price,
          amount,
          total
        });
      }

      return isAsk ? orders.reverse() : orders;
    };

    const updateOrderBook = () => {
      const basePrice = 96234.50;
      setAsks(generateOrders(basePrice + 50, 15, true));
      setBids(generateOrders(basePrice - 10, 15, false));
    };

    updateOrderBook();
    const interval = setInterval(updateOrderBook, 2000);

    return () => clearInterval(interval);
  }, []);

  const maxTotal = Math.max(
    ...asks.map(o => o.total),
    ...bids.map(o => o.total)
  );

  const OrderRow = ({ order, isAsk }: { order: OrderBookItem; isAsk: boolean }) => {
    const percentage = (order.total / maxTotal) * 100;

    return (
      <div className="relative h-5 text-xs flex items-center justify-between px-3 hover:bg-[#2B3139] cursor-pointer">
        <div
          className={`absolute inset-0 ${isAsk ? 'bg-[#F6465D]' : 'bg-[#0ECB81]'} opacity-10`}
          style={{ width: `${percentage}%`, right: 0, left: 'auto' }}
        />
        <span className={`relative z-10 ${isAsk ? 'text-[#F6465D]' : 'text-[#0ECB81]'}`}>
          {order.price.toFixed(2)}
        </span>
        <span className="relative z-10 text-white">
          {order.amount.toFixed(4)}
        </span>
        <span className="relative z-10 text-gray-400">
          {order.total.toFixed(4)}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-[#0B0E11] h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-[#2B3139] p-3">
        <h3 className="text-sm font-semibold text-white">Order Book</h3>
      </div>

      {/* Column Headers */}
      <div className="flex justify-between px-3 py-2 text-xs text-gray-400 border-b border-[#2B3139]">
        <span>Price(USDT)</span>
        <span>Amount(BTC)</span>
        <span>Total</span>
      </div>

      {/* Orders */}
      <div className="flex-1">
        {/* Asks (Sell Orders) */}
        <div className="flex flex-col-reverse">
          {asks.map((order, idx) => (
            <OrderRow key={`ask-${idx}`} order={order} isAsk={true} />
          ))}
        </div>

        {/* Current Price */}
        <div className="bg-[#181A20] py-2 px-3 border-y border-[#2B3139]">
          <div className="text-[#0ECB81] text-lg font-semibold">
            {bids[0]?.price.toFixed(2) || '96,234.50'}
          </div>
          <div className="text-xs text-gray-400">
            ${bids[0]?.price.toFixed(2) || '96,234.50'}
          </div>
        </div>

        {/* Bids (Buy Orders) */}
        <div>
          {bids.map((order, idx) => (
            <OrderRow key={`bid-${idx}`} order={order} isAsk={false} />
          ))}
        </div>
      </div>
    </div>
  );
}
