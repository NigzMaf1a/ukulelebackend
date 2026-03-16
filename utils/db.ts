// db.ts
import { Pool, PoolClient, QueryResult, QueryResultRow } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DB_URL) {
  throw new Error('❌ Missing required environment variable: DB_URL');
}

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

console.log(`✅ Postgres pool created with DB URL: ${process.env.DB_URL}`);

// Health check
(async () => {
  try {
    const res: QueryResult = await pool.query('SELECT 1');
    console.log('🟢 Postgres pool is healthy.', res.rows);
  } catch (err) {
    console.error('❌ Postgres connection failed:', (err as Error).message);
    process.exit(1);
  }
})();

// Typed query helper
export async function query<T extends Record<string, unknown> = Record<string, unknown>>(
  sql: string,
  params?: unknown[]
): Promise<T[]> {
  try {
    const res = await pool.query<T>(sql, params as any[] | undefined);
    return res.rows;
  } catch (err) {
    console.error('❌ DB Query Failed:', { sql, params, error: (err as Error).message });
    throw err;
  }
}

/**
 * Get a transaction-ready client
 * Usage:
 * const client = await getConnection();
 * await client.query('BEGIN');
 * try { ... await client.query(...) ... await client.query('COMMIT') }
 * catch { await client.query('ROLLBACK') }
 * finally { client.release() }
 */
export async function getConnection(): Promise<
  PoolClient & {
    execute: <T extends QueryResultRow = QueryResultRow>(
      sql: string,
      params?: unknown[]
    ) => Promise<[QueryResult<T>, undefined]>
  }
> {
  const client = await pool.connect();

  const execute = async <T extends QueryResultRow = QueryResultRow>(
    sql: string,
    params?: unknown[]
  ): Promise<[QueryResult<T>, undefined]> => {
    const res = await client.query<T>(sql, params);
    return [res, undefined];
  };

  return Object.assign(client, { execute });
}

// Graceful shutdown
async function shutdownPool() {
  console.log('🔌 Closing Postgres pool...');
  await pool.end();
  console.log('✅ Postgres pool closed.');
}

process.on('SIGINT', async () => {
  await shutdownPool();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await shutdownPool();
  process.exit(0);
});

export default pool;