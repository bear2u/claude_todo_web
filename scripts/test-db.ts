import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../db/schema';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testDatabaseConnection() {
  console.log('🔍 Testing database connection...\n');

  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is not defined in .env file');
    process.exit(1);
  }

  console.log('📝 Database URL:', process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@'));

  try {
    // Create postgres client
    const client = postgres(process.env.DATABASE_URL);
    const db = drizzle(client, { schema });

    // Test connection
    console.log('\n⏳ Connecting to database...');
    await client`SELECT 1`;
    console.log('✅ Successfully connected to PostgreSQL!\n');

    // Insert sample trading pair
    console.log('📝 Inserting sample trading pair...');
    const [tradingPair] = await db.insert(schema.tradingPairs).values({
      symbol: 'BTC/USDT',
      baseAsset: 'BTC',
      quoteAsset: 'USDT',
      isActive: true,
    }).returning();
    console.log('✅ Trading pair inserted:', tradingPair);

    // Insert sample user
    console.log('\n📝 Inserting sample user...');
    const [user] = await db.insert(schema.users).values({
      email: 'test@example.com',
      username: 'testuser',
      passwordHash: 'hashed_password_here', // In production, use bcrypt
      balance: '10000.00',
    }).returning();
    console.log('✅ User inserted:', { id: user.id, email: user.email, username: user.username });

    // Insert sample order
    console.log('\n📝 Inserting sample order...');
    const [order] = await db.insert(schema.orders).values({
      userId: user.id,
      pairId: tradingPair.id,
      type: 'limit',
      side: 'buy',
      price: '96234.50',
      amount: '0.1',
      filled: '0',
      status: 'pending',
    }).returning();
    console.log('✅ Order inserted:', order);

    // Insert sample position
    console.log('\n📝 Inserting sample position...');
    const [position] = await db.insert(schema.positions).values({
      userId: user.id,
      pairId: tradingPair.id,
      side: 'long',
      leverage: 10,
      entryPrice: '95800.00',
      size: '0.125',
      liquidationPrice: '91250.00',
      unrealizedPnl: '54.31',
      isOpen: true,
    }).returning();
    console.log('✅ Position inserted:', position);

    // Query all data
    console.log('\n📊 Querying all data...');
    const allUsers = await db.select().from(schema.users);
    const allPairs = await db.select().from(schema.tradingPairs);
    const allOrders = await db.select().from(schema.orders);
    const allPositions = await db.select().from(schema.positions);

    console.log('\n📈 Database Summary:');
    console.log(`   Users: ${allUsers.length}`);
    console.log(`   Trading Pairs: ${allPairs.length}`);
    console.log(`   Orders: ${allOrders.length}`);
    console.log(`   Positions: ${allPositions.length}`);

    console.log('\n✅ Database test completed successfully!');
    console.log('\n💡 Tip: Run "npm run db:studio" to view your database in a GUI\n');

    await client.end();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Database connection failed:');
    console.error(error);
    console.log('\n💡 Make sure PostgreSQL is running and DATABASE_URL is correct in .env file');
    console.log('💡 Example: DATABASE_URL=postgresql://postgres:postgres@localhost:5432/binance_clone\n');
    process.exit(1);
  }
}

testDatabaseConnection();
