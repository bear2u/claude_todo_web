'use client';

import { useState, useEffect } from 'react';

interface Trade {
  price: number;
  amount: number;
  time: string;
  isBuy: boolean;
}

export default function RecentTrades() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    // Generate initial trades
    const generateTrade = (): Trade => {
      const basePrice = 96234.50;
      const price = basePrice + (Math.random() - 0.5) * 100;
      const amount = Math.random() * 0.5;
      const now = new Date();
      const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
      const isBuy = Math.random() > 0.5;

      return { price, amount, time, isBuy };
    };

    // Initialize with 20 trades
    const initialTrades = Array.from({ length: 20 }, generateTrade);
    setTrades(initialTrades);

    // Add new trade every 2 seconds
    const interval = setInterval(() => {
      setTrades(prev => [generateTrade(), ...prev.slice(0, 19)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0B0E11] h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-[#2B3139] p-3">
        <h3 className="text-sm font-semibold text-white">Recent Trades</h3>
      </div>

      {/* Column Headers */}
      <div className="flex justify-between px-3 py-2 text-xs text-gray-400 border-b border-[#2B3139]">
        <span>Price(USDT)</span>
        <span>Amount(BTC)</span>
        <span>Time</span>
      </div>

      {/* Trades List */}
      <div className="flex-1 overflow-y-auto">
        {trades.map((trade, idx) => (
          <div
            key={`${trade.time}-${idx}`}
            className="flex justify-between px-3 py-1 text-xs hover:bg-[#2B3139] cursor-pointer"
          >
            <span className={trade.isBuy ? 'text-[#0ECB81]' : 'text-[#F6465D]'}>
              {trade.price.toFixed(2)}
            </span>
            <span className="text-white">
              {trade.amount.toFixed(4)}
            </span>
            <span className="text-gray-400">
              {trade.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
