'use client';

import { useState, useEffect } from 'react';

export default function TradingHeader() {
  const [price, setPrice] = useState('96,234.50');
  const [change, setChange] = useState('+2.34');
  const [changePercent, setChangePercent] = useState('+2.49%');

  // Mock price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const randomChange = (Math.random() - 0.5) * 100;
      const newPrice = 96234.50 + randomChange;
      const changeValue = randomChange;
      const changePercentValue = (randomChange / 96234.50) * 100;

      setPrice(newPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
      setChange(changeValue >= 0 ? `+${changeValue.toFixed(2)}` : changeValue.toFixed(2));
      setChangePercent(changePercentValue >= 0 ? `+${changePercentValue.toFixed(2)}%` : `${changePercentValue.toFixed(2)}%`);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const isPositive = change.startsWith('+');

  return (
    <div className="bg-[#0B0E11] border-b border-[#2B3139] px-4 py-3">
      <div className="flex items-center gap-8">
        {/* Symbol */}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-white">BTC/USDT</h1>
          <span className="text-xs text-gray-400">Bitcoin</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-6">
          <div>
            <div className={`text-2xl font-semibold ${isPositive ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
              ${price}
            </div>
            <div className={`text-xs ${isPositive ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
              {change} {changePercent}
            </div>
          </div>

          {/* 24h Stats */}
          <div className="flex gap-6 text-sm">
            <div>
              <div className="text-gray-400 text-xs">24h High</div>
              <div className="text-white">98,432.10</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">24h Low</div>
              <div className="text-white">94,128.30</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">24h Volume(BTC)</div>
              <div className="text-white">23,456.78</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs">24h Volume(USDT)</div>
              <div className="text-white">2.25B</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
