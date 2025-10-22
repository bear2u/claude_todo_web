import { pgTable, serial, varchar, decimal, timestamp, boolean, integer } from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 100 }).notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  balance: decimal('balance', { precision: 20, scale: 8 }).default('0').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Trading pairs table
export const tradingPairs = pgTable('trading_pairs', {
  id: serial('id').primaryKey(),
  symbol: varchar('symbol', { length: 20 }).notNull().unique(), // e.g., 'BTC/USDT'
  baseAsset: varchar('base_asset', { length: 10 }).notNull(), // e.g., 'BTC'
  quoteAsset: varchar('quote_asset', { length: 10 }).notNull(), // e.g., 'USDT'
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Orders table
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  pairId: integer('pair_id').notNull().references(() => tradingPairs.id),
  type: varchar('type', { length: 20 }).notNull(), // 'limit', 'market'
  side: varchar('side', { length: 10 }).notNull(), // 'buy', 'sell'
  price: decimal('price', { precision: 20, scale: 8 }),
  amount: decimal('amount', { precision: 20, scale: 8 }).notNull(),
  filled: decimal('filled', { precision: 20, scale: 8 }).default('0').notNull(),
  status: varchar('status', { length: 20 }).notNull(), // 'pending', 'filled', 'cancelled'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Positions table (for futures trading)
export const positions = pgTable('positions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  pairId: integer('pair_id').notNull().references(() => tradingPairs.id),
  side: varchar('side', { length: 10 }).notNull(), // 'long', 'short'
  leverage: integer('leverage').notNull(),
  entryPrice: decimal('entry_price', { precision: 20, scale: 8 }).notNull(),
  size: decimal('size', { precision: 20, scale: 8 }).notNull(),
  liquidationPrice: decimal('liquidation_price', { precision: 20, scale: 8 }),
  unrealizedPnl: decimal('unrealized_pnl', { precision: 20, scale: 8 }).default('0'),
  isOpen: boolean('is_open').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  closedAt: timestamp('closed_at'),
});

// Trades table (executed trades)
export const trades = pgTable('trades', {
  id: serial('id').primaryKey(),
  pairId: integer('pair_id').notNull().references(() => tradingPairs.id),
  buyOrderId: integer('buy_order_id').notNull().references(() => orders.id),
  sellOrderId: integer('sell_order_id').notNull().references(() => orders.id),
  price: decimal('price', { precision: 20, scale: 8 }).notNull(),
  amount: decimal('amount', { precision: 20, scale: 8 }).notNull(),
  executedAt: timestamp('executed_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type TradingPair = typeof tradingPairs.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type Position = typeof positions.$inferSelect;
export type Trade = typeof trades.$inferSelect;
