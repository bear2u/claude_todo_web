import TradingHeader from "@/components/TradingHeader";
import TradingViewChart from "@/components/TradingViewChart";
import OrderBook from "@/components/OrderBook";
import RecentTrades from "@/components/RecentTrades";
import OrderPanel from "@/components/OrderPanel";

export default function Home() {
  return (
    <div className="h-screen flex flex-col bg-[#0B0E11]">
      {/* Header */}
      <TradingHeader />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Chart */}
        <div className="flex-1 border-r border-[#2B3139]">
          <TradingViewChart />
        </div>

        {/* Right: Order Book & Recent Trades */}
        <div className="w-[340px] flex flex-col">
          <div className="h-1/2 border-b border-[#2B3139]">
            <OrderBook />
          </div>
          <div className="h-1/2">
            <RecentTrades />
          </div>
        </div>
      </div>

      {/* Bottom: Order Panel */}
      <div className="h-[300px]">
        <OrderPanel />
      </div>
    </div>
  );
}
