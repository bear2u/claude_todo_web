'use client';

import { useState } from "react";
import TradingHeader from "@/components/TradingHeader";
import TradingViewChart from "@/components/TradingViewChart";
import OrderBook from "@/components/OrderBook";
import RecentTrades from "@/components/RecentTrades";
import OrderPanel from "@/components/OrderPanel";
import PositionsPanel from "@/components/PositionsPanel";

export default function Home() {
  const [activeTab, setActiveTab] = useState<'orderbook' | 'trades'>('orderbook');

  return (
    <div className="h-screen flex flex-col bg-[#0B0E11]">
      {/* Header */}
      <TradingHeader />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Chart */}
        <div className="h-[250px] lg:h-auto lg:flex-1 border-b lg:border-b-0 lg:border-r border-[#2B3139]">
          <TradingViewChart />
        </div>

        {/* Desktop: Order Book & Recent Trades side by side */}
        <div className="hidden lg:flex lg:w-[340px] flex-col">
          <div className="h-1/2 border-b border-[#2B3139]">
            <OrderBook />
          </div>
          <div className="h-1/2">
            <RecentTrades />
          </div>
        </div>

        {/* Mobile: Tabbed Order Book & Recent Trades */}
        <div className="lg:hidden flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-[#2B3139] bg-[#0B0E11]">
            <button
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === 'orderbook'
                  ? 'text-white border-b-2 border-[#0ECB81]'
                  : 'text-gray-400'
              }`}
              onClick={() => setActiveTab('orderbook')}
            >
              Order Book
            </button>
            <button
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === 'trades'
                  ? 'text-white border-b-2 border-[#0ECB81]'
                  : 'text-gray-400'
              }`}
              onClick={() => setActiveTab('trades')}
            >
              Trades
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'orderbook' ? <OrderBook /> : <RecentTrades />}
          </div>
        </div>
      </div>

      {/* Bottom Panels: Order Panel & Positions */}
      <div className="border-t border-[#2B3139]">
        {/* Desktop: Side by side */}
        <div className="hidden lg:flex h-[300px]">
          <div className="w-1/2 border-r border-[#2B3139]">
            <OrderPanel />
          </div>
          <div className="w-1/2">
            <PositionsPanel />
          </div>
        </div>

        {/* Mobile: Stacked */}
        <div className="lg:hidden">
          <div className="h-[240px] border-b border-[#2B3139]">
            <OrderPanel />
          </div>
          <div className="h-[200px]">
            <PositionsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
