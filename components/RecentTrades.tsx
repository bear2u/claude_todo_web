'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Trade {
  price: number;
  amount: number;
  time: string;
  isBuy: boolean;
}

export default function RecentTrades() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(true);

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
    <div className={`bg-[#0B0E11] flex flex-col transition-all duration-300 ${isCollapsed ? '' : 'max-h-[500px]'}`}>
      {/* Header */}
      <div
        className="border-b border-[#2B3139] p-3 flex items-center justify-between cursor-pointer hover:bg-[#181A20] transition-colors"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h3 className="text-sm font-semibold text-white">Recent Trades</h3>
        <button className="text-gray-400 hover:text-white transition-colors">
          {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </button>
      </div>

      {/* Content - Only show when expanded */}
      {!isCollapsed && (
        <>
          {/* Column Headers */}
          <div className="flex justify-between px-3 py-2 text-xs text-gray-400 border-b border-[#2B3139]">
            <span>Price(USDT)</span>
            <span>Amount(BTC)</span>
            <span>Time</span>
          </div>

          {/* Trades List */}
          <div className="overflow-y-auto">
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
        </>
      )}
    </div>
  );
}
