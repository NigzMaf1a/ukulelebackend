import mysql, { Pool, PoolOptions, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// ---- Validate required env vars ----
const requiredEnvVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'] as const;
for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
}

// ---- Create the pool ----
const poolConfig: PoolOptions = {
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONN_LIMIT) || 10,
  queueLimit: 0,
};

const pool: Pool = mysql.createPool(poolConfig);

console.log(`✅ MySQL pool created for DB: ${process.env.DB_NAME} @ ${process.env.DB_HOST}`);

// ---- Health check ----
(async () => {
  try {
    await pool.query('SELECT 1');
    console.log('🟢 MySQL pool is healthy and ready.');
  } catch (err) {
    console.error('❌ MySQL connection failed:', (err as Error).message);
    process.exit(1);
  }
})();

// ---- Typed query helper ----
export async function query<T extends RowDataPacket>(
  sql: string,
  params?: ReadonlyArray<unknown>
): Promise<T[]>;

export async function query(
  sql: string,
  params?: ReadonlyArray<unknown>
): Promise<ResultSetHeader>;

export async function query<T extends RowDataPacket>(
  sql: string,
  params?: ReadonlyArray<unknown>
): Promise<T[] | ResultSetHeader> {
  try {
    const [rows] = await pool.query(sql, params);
    return rows as T[] | ResultSetHeader;
  } catch (err) {
    console.error('❌ DB Query Failed:', {
      sql,
      params,
      error: (err as Error).message,
    });
    throw err;
  }
}

// ---- Graceful shutdown ----
async function shutdownPool() {
  console.log('🔌 Closing MySQL connection pool...');
  await pool.end();
  console.log('✅ MySQL pool closed.');
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
