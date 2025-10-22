# Binance Trading UI Clone

A modern cryptocurrency trading platform UI clone that replicates the Binance trading interface with TradingView chart integration, built with Next.js 15, TypeScript, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![TradingView](https://img.shields.io/badge/TradingView-131722?style=for-the-badge&logo=tradingview)

## Features

### Trading Interface
- 📊 **TradingView Chart Integration**
  - Real-time BTC/USDT chart
  - Advanced charting tools
  - Dark theme optimized

- 📖 **Order Book**
  - Real-time bid/ask visualization
  - Volume-weighted depth indicator
  - Color-coded buy/sell orders

- 💹 **Recent Trades**
  - Live trade feed
  - Price and volume display
  - Timestamp for each trade

- 🎯 **Trading Panel**
  - Limit and Market order types
  - Buy/Sell functionality
  - Percentage-based amount selection
  - Balance display

### UI/UX
- 🎨 Binance-inspired dark theme
- 📱 Responsive layout
- ✨ Smooth animations and transitions
- 🖱️ Hover effects and interactive elements
- 📊 Professional trading interface

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Charts**: [TradingView Advanced Charts](https://www.tradingview.com/widget/)
- **UI Components**: Custom components
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd claude_todo_web
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
claude_todo_web/
├── app/
│   ├── globals.css           # Global styles with Binance theme
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main trading page
├── components/
│   ├── TradingHeader.tsx     # Top ticker bar with price info
│   ├── TradingViewChart.tsx  # TradingView chart integration
│   ├── OrderBook.tsx         # Real-time order book
│   ├── RecentTrades.tsx      # Recent trades feed
│   └── OrderPanel.tsx        # Buy/Sell order panel
└── lib/
    └── utils.ts              # Utility functions
```

## Build

To create a production build:

```bash
npm run build
```

To run the production build:

```bash
npm start
```

## Features in Detail

### Trading Header
- Real-time price updates
- 24h high/low prices
- 24h trading volume
- Price change percentage

### TradingView Chart
- Embedded TradingView advanced chart
- BTC/USDT trading pair
- Dark theme optimized
- Full charting capabilities

### Order Book
- Real-time bid/ask prices
- Volume visualization with background bars
- Current market price display
- Color-coded buy (green) and sell (red) orders

### Recent Trades
- Live trade feed
- Trade price, amount, and time
- Color-coded by trade direction

### Order Panel
- Limit and Market order types
- Separate buy/sell interfaces
- Available balance display
- Percentage-based amount selection
- Total calculation

## Development Notes

- Mock data is used for order book, trades, and price updates
- TradingView widget loads asynchronously via script injection
- Dark theme colors match Binance's design system
- All components are client-side rendered for real-time updates

## Future Enhancements

- [ ] WebSocket integration for real-time data
- [ ] Backend API integration
- [ ] User authentication
- [ ] Order history and management
- [ ] Multiple trading pairs
- [ ] Portfolio tracking
- [ ] Depth chart visualization
- [ ] Advanced order types (Stop-Limit, OCO)
- [ ] Mobile responsive optimization

## License

MIT

---

Built with ❤️ using Next.js, TypeScript, and TradingView
