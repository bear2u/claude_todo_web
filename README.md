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
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team/)
- **UI Components**: Custom components
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- PostgreSQL 14+ (for database features)

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

3. Set up the database:

**Option A: Use Cloud PostgreSQL (Easiest)** ⭐
- Sign up for [Neon](https://neon.tech/) or [Supabase](https://supabase.com/) (Free)
- Copy your connection string
- Update `.env` with your DATABASE_URL

**Option B: Use Docker** 🐳
```bash
docker-compose up -d
```

**Option C: Install PostgreSQL locally**
- See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed instructions

Then push the schema:
```bash
# Test connection
npm run db:setup

# Push schema to database
npm run db:push

# Test with sample data
npm run db:test
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

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
│   ├── OrderBook.tsx         # Real-time order book (collapsible)
│   ├── RecentTrades.tsx      # Recent trades feed (collapsible)
│   ├── OrderPanel.tsx        # Buy/Sell order panel
│   └── PositionsPanel.tsx    # Futures positions display
├── db/
│   ├── schema.ts             # Database schema definitions
│   └── index.ts              # Database connection
├── lib/
│   └── utils.ts              # Utility functions
└── drizzle.config.ts         # Drizzle ORM configuration
```

## Database Commands

```bash
# Generate migrations from schema changes
npm run db:generate

# Push schema directly to database (for development)
npm run db:push

# Run migrations
npm run db:migrate

# Open Drizzle Studio (database GUI)
npm run db:studio
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

## Database Schema

The application uses PostgreSQL with Drizzle ORM. The schema includes:

- **users**: User accounts with balance tracking
- **trading_pairs**: Available trading pairs (BTC/USDT, ETH/USDT, etc.)
- **orders**: Buy/sell orders (limit and market)
- **positions**: Futures trading positions with leverage
- **trades**: Executed trade history

All tables include proper foreign key relationships and timestamps.

## Development Notes

- Mock data is used for order book, trades, and price updates (UI demo)
- TradingView widget loads asynchronously via script injection
- Dark theme colors match Binance's design system (#0B0E11, #181A20, #2B3139)
- All components are client-side rendered for real-time updates
- Database ready for backend integration

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
