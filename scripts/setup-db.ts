import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../db/schema';
import * as dotenv from 'dotenv';
import { sql } from 'drizzle-orm';

// Load environment variables
dotenv.config();

async function setupDatabase() {
  console.log('🚀 Setting up database...\n');

  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is not defined in .env file');
    process.exit(1);
  }

  try {
    const client = postgres(process.env.DATABASE_URL);
    const db = drizzle(client, { schema });

    console.log('⏳ Connecting to database...');
    await client`SELECT 1`;
    console.log('✅ Connected!\n');

    // Check if tables exist
    console.log('🔍 Checking existing tables...');
    const tables = await client`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `;

    if (tables.length > 0) {
      console.log('⚠️  Found existing tables:');
      tables.forEach((t: any) => console.log(`   - ${t.table_name}`));
      console.log('\n💡 Run "npm run db:push" to sync schema with database\n');
    } else {
      console.log('📝 No tables found. Database is empty.');
      console.log('💡 Run "npm run db:push" to create tables\n');
    }

    await client.end();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Setup failed:');
    console.error(error);
    process.exit(1);
  }
}

setupDatabase();
