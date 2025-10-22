# Database Quick Start Guide

## Prerequisites

You need a PostgreSQL database. The easiest option is **Neon** (free serverless PostgreSQL).

## Setup Steps

### 1. Get Database Connection String

**Option A: Neon (Recommended)**
1. Go to https://neon.tech
2. Sign up for free account
3. Create a new project
4. Copy the connection string (looks like: `postgresql://username:password@ep-xxxxx.region.aws.neon.tech/dbname?sslmode=require`)

**Option B: Docker**
```bash
docker-compose up -d
# Connection string: postgresql://postgres:postgres@localhost:5432/binance_clone
```

### 2. Configure Environment

Create `.env` file in project root:
```bash
cp .env.example .env
```

Edit `.env` and paste your connection string:
```env
DATABASE_URL=postgresql://your-connection-string-here
```

### 3. Test Database Connection

Run these commands in order:

```bash
# 1. Test connection
npm run db:setup

# 2. Push schema to database (creates 5 tables)
npm run db:push

# 3. Insert sample data and verify
npm run db:test
```

## Expected Output

### db:setup
```
✅ Database connection successful!
📊 Database Summary:
   - Total tables: 0 (before push)
```

### db:push
```
✅ Pushing schema to database...
Created tables: users, trading_pairs, orders, positions, trades
```

### db:test
```
✅ Database connection successful!

📝 Creating sample data...
✅ Created user: test@example.com
✅ Created trading pair: BTC/USDT
✅ Created order: #1
✅ Created position: #1

📊 Database Summary:
   - Total users: 1
   - Total trading pairs: 1
   - Total orders: 1
   - Total positions: 1
```

## Database Schema

The following tables will be created:

- **users** - User accounts with balances
- **trading_pairs** - Available trading pairs (BTC/USDT, ETH/USDT, etc.)
- **orders** - Buy/sell orders (limit, market)
- **positions** - Futures positions with leverage
- **trades** - Executed trade history

## Drizzle Studio (Optional)

To view/edit data visually:

```bash
npm run db:studio
```

Opens at http://localhost:4983

## Troubleshooting

### Connection refused (ECONNREFUSED)
- Check DATABASE_URL is correct in `.env`
- If using Docker, ensure container is running: `docker-compose ps`
- If using Neon, check your internet connection

### DNS lookup failed (EAI_AGAIN)
- Network connectivity issue
- Check firewall settings
- Try different network (e.g., mobile hotspot)

### Tables already exist
- This is normal if you've run `db:push` before
- Data will be preserved

## Next Steps

Once database is working, the Next.js app will be ready to:
- Store real user accounts
- Track actual orders and positions
- Persist trading history
- Calculate real P&L from database
