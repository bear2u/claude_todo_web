'use client';

import { useState } from 'react';

export default function OrderPanel() {
  const [orderType, setOrderType] = useState<'limit' | 'market'>('limit');
  const [tradeSide, setTradeSide] = useState<'buy' | 'sell'>('buy');
  const [buyPrice, setBuyPrice] = useState('96234.50');
  const [buyAmount, setBuyAmount] = useState('');
  const [sellPrice, setSellPrice] = useState('96234.50');
  const [sellAmount, setSellAmount] = useState('');

  const OrderForm = ({ isBuy }: { isBuy: boolean }) => {
    const price = isBuy ? buyPrice : sellPrice;
    const setPrice = isBuy ? setBuyPrice : setSellPrice;
    const amount = isBuy ? buyAmount : sellAmount;
    const setAmount = isBuy ? setBuyAmount : setSellAmount;
    const color = isBuy ? '#0ECB81' : '#F6465D';

    return (
      <div className="flex-1 p-3 md:p-4 space-y-3 md:space-y-4">
        {/* Order Type Tabs */}
        <div className="flex gap-2 text-xs md:text-sm">
          <button
            className={`px-2 md:px-3 py-1 rounded ${orderType === 'limit' ? 'bg-[#2B3139] text-white' : 'text-gray-400'}`}
            onClick={() => setOrderType('limit')}
          >
            Limit
          </button>
          <button
            className={`px-2 md:px-3 py-1 rounded ${orderType === 'market' ? 'bg-[#2B3139] text-white' : 'text-gray-400'}`}
            onClick={() => setOrderType('market')}
          >
            Market
          </button>
        </div>

        {/* Available Balance */}
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Available</span>
          <span className="text-white">{isBuy ? '10,000.00 USDT' : '0.5000 BTC'}</span>
        </div>

        {/* Price Input */}
        {orderType === 'limit' && (
          <div>
            <label className="text-xs text-gray-400">Price</label>
            <div className="mt-1 bg-[#2B3139] rounded p-2 flex items-center">
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none text-sm"
              />
              <span className="text-gray-400 text-xs">USDT</span>
            </div>
          </div>
        )}

        {/* Amount Input */}
        <div>
          <label className="text-xs text-gray-400">Amount</label>
          <div className="mt-1 bg-[#2B3139] rounded p-2 flex items-center">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="flex-1 bg-transparent text-white outline-none text-sm"
            />
            <span className="text-gray-400 text-xs">BTC</span>
          </div>
        </div>

        {/* Percentage Buttons */}
        <div className="flex gap-1 md:gap-2">
          {[25, 50, 75, 100].map((percent) => (
            <button
              key={percent}
              className="flex-1 py-1 bg-[#2B3139] hover:bg-[#3B4149] text-gray-400 text-xs rounded"
              onClick={() => {
                const maxAmount = isBuy ? '0.1038' : '0.5000';
                setAmount((parseFloat(maxAmount) * percent / 100).toFixed(4));
              }}
            >
              {percent}%
            </button>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between text-xs md:text-sm">
          <span className="text-gray-400">Total</span>
          <span className="text-white">
            {(parseFloat(price) * parseFloat(amount || '0')).toFixed(2)} USDT
          </span>
        </div>

        {/* Submit Button */}
        <button
          className="w-full py-2 md:py-3 rounded font-semibold text-white text-sm md:text-base transition-opacity hover:opacity-90"
          style={{ backgroundColor: color }}
        >
          {isBuy ? 'Buy BTC' : 'Sell BTC'}
        </button>
      </div>
    );
  };

  return (
    <div className="bg-[#0B0E11] h-full">
      {/* Mobile: Buy/Sell Tabs */}
      <div className="lg:hidden">
        <div className="flex border-b border-[#2B3139]">
          <button
            className={`flex-1 py-3 text-sm font-semibold ${
              tradeSide === 'buy'
                ? 'text-[#0ECB81] border-b-2 border-[#0ECB81]'
                : 'text-gray-400'
            }`}
            onClick={() => setTradeSide('buy')}
          >
            Buy
          </button>
          <button
            className={`flex-1 py-3 text-sm font-semibold ${
              tradeSide === 'sell'
                ? 'text-[#F6465D] border-b-2 border-[#F6465D]'
                : 'text-gray-400'
            }`}
            onClick={() => setTradeSide('sell')}
          >
            Sell
          </button>
        </div>
        <OrderForm isBuy={tradeSide === 'buy'} />
      </div>

      {/* Desktop: Side by side */}
      <div className="hidden lg:flex divide-x divide-[#2B3139]">
        <OrderForm isBuy={true} />
        <OrderForm isBuy={false} />
      </div>
    </div>
  );
}
