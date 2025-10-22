'use client';

import { useState, useEffect } from 'react';

interface Position {
  symbol: string;
  side: 'long' | 'short';
  size: number;
  entryPrice: number;
  markPrice: number;
  liquidationPrice: number;
  leverage: number;
  unrealizedPnl: number;
  unrealizedPnlPercent: number;
}

export default function PositionsPanel() {
  const [activeTab, setActiveTab] = useState<'positions' | 'orders' | 'history'>('positions');
  const [positions, setPositions] = useState<Position[]>([
    {
      symbol: 'BTC/USDT',
      side: 'long',
      size: 0.125,
      entryPrice: 95800.00,
      markPrice: 96234.50,
      liquidationPrice: 91250.00,
      leverage: 10,
      unrealizedPnl: 54.31,
      unrealizedPnlPercent: 0.45
    },
    {
      symbol: 'ETH/USDT',
      side: 'short',
      size: 2.5,
      entryPrice: 3520.00,
      markPrice: 3498.50,
      liquidationPrice: 3850.00,
      leverage: 5,
      unrealizedPnl: 53.75,
      unrealizedPnlPercent: 0.61
    }
  ]);

  // Mock price updates for positions
  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(prevPositions =>
        prevPositions.map(pos => {
          const priceChange = (Math.random() - 0.5) * 50;
          const newMarkPrice = pos.markPrice + priceChange;
          const priceDiff = newMarkPrice - pos.entryPrice;
          const positionValue = pos.size * pos.entryPrice;
          const unrealizedPnl = pos.side === 'long'
            ? priceDiff * pos.size
            : -priceDiff * pos.size;
          const unrealizedPnlPercent = (unrealizedPnl / positionValue) * 100 * pos.leverage;

          return {
            ...pos,
            markPrice: newMarkPrice,
            unrealizedPnl,
            unrealizedPnlPercent
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0B0E11] h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-[#2B3139]">
        <button
          className={`px-4 py-3 text-xs md:text-sm font-medium transition-colors ${
            activeTab === 'positions'
              ? 'text-white border-b-2 border-[#0ECB81]'
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('positions')}
        >
          Positions ({positions.length})
        </button>
        <button
          className={`px-4 py-3 text-xs md:text-sm font-medium transition-colors ${
            activeTab === 'orders'
              ? 'text-white border-b-2 border-[#0ECB81]'
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('orders')}
        >
          Open Orders (0)
        </button>
        <button
          className={`px-4 py-3 text-xs md:text-sm font-medium transition-colors ${
            activeTab === 'history'
              ? 'text-white border-b-2 border-[#0ECB81]'
              : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('history')}
        >
          Order History
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'positions' && (
          <>
            {positions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
                <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>No open positions</p>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block">
                  <table className="w-full text-xs">
                    <thead className="border-b border-[#2B3139] text-gray-400">
                      <tr>
                        <th className="text-left p-3 font-normal">Symbol</th>
                        <th className="text-left p-3 font-normal">Size</th>
                        <th className="text-right p-3 font-normal">Entry Price</th>
                        <th className="text-right p-3 font-normal">Mark Price</th>
                        <th className="text-right p-3 font-normal">Liq. Price</th>
                        <th className="text-right p-3 font-normal">PNL (ROE %)</th>
                        <th className="text-center p-3 font-normal">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {positions.map((position, idx) => (
                        <tr key={idx} className="border-b border-[#2B3139] hover:bg-[#181A20]">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                position.side === 'long'
                                  ? 'bg-[#0ECB81] bg-opacity-20 text-[#0ECB81]'
                                  : 'bg-[#F6465D] bg-opacity-20 text-[#F6465D]'
                              }`}>
                                {position.side === 'long' ? 'Long' : 'Short'} {position.leverage}x
                              </span>
                              <span className="text-white font-medium">{position.symbol}</span>
                            </div>
                          </td>
                          <td className="p-3 text-white">{position.size}</td>
                          <td className="p-3 text-white text-right">${position.entryPrice.toFixed(2)}</td>
                          <td className="p-3 text-white text-right">${position.markPrice.toFixed(2)}</td>
                          <td className="p-3 text-white text-right">${position.liquidationPrice.toFixed(2)}</td>
                          <td className="p-3 text-right">
                            <div className={position.unrealizedPnl >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'}>
                              <div className="font-semibold">
                                {position.unrealizedPnl >= 0 ? '+' : ''}{position.unrealizedPnl.toFixed(2)} USDT
                              </div>
                              <div className="text-xs">
                                ({position.unrealizedPnl >= 0 ? '+' : ''}{position.unrealizedPnlPercent.toFixed(2)}%)
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex justify-center gap-2">
                              <button className="px-3 py-1 bg-[#2B3139] hover:bg-[#3B4149] text-white rounded text-xs">
                                Close
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden p-3 space-y-3">
                  {positions.map((position, idx) => (
                    <div key={idx} className="bg-[#181A20] rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            position.side === 'long'
                              ? 'bg-[#0ECB81] bg-opacity-20 text-[#0ECB81]'
                              : 'bg-[#F6465D] bg-opacity-20 text-[#F6465D]'
                          }`}>
                            {position.side === 'long' ? 'Long' : 'Short'} {position.leverage}x
                          </span>
                          <span className="text-white font-semibold">{position.symbol}</span>
                        </div>
                        <div className={`text-right ${position.unrealizedPnl >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'}`}>
                          <div className="font-semibold text-sm">
                            {position.unrealizedPnl >= 0 ? '+' : ''}{position.unrealizedPnl.toFixed(2)} USDT
                          </div>
                          <div className="text-xs">
                            ({position.unrealizedPnl >= 0 ? '+' : ''}{position.unrealizedPnlPercent.toFixed(2)}%)
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <div className="text-gray-400">Size</div>
                          <div className="text-white font-medium">{position.size}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Entry Price</div>
                          <div className="text-white font-medium">${position.entryPrice.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Mark Price</div>
                          <div className="text-white font-medium">${position.markPrice.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Liq. Price</div>
                          <div className="text-white font-medium">${position.liquidationPrice.toFixed(2)}</div>
                        </div>
                      </div>

                      <button className="w-full py-2 bg-[#2B3139] hover:bg-[#3B4149] text-white rounded text-sm font-medium">
                        Close Position
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {activeTab === 'orders' && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
            <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>No open orders</p>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
            <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>No order history</p>
          </div>
        )}
      </div>
    </div>
  );
}
