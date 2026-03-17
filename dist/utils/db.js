"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = query;
exports.getConnection = getConnection;
// db.ts
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.DB_URL) {
    throw new Error('❌ Missing required environment variable: DB_URL');
}
const pool = new pg_1.Pool({
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: false },
});
console.log(`✅ Postgres pool created with DB URL: ${process.env.DB_URL}`);
// Health check
(async () => {
    try {
        const res = await pool.query('SELECT 1');
        console.log('🟢 Postgres pool is healthy.', res.rows);
    }
    catch (err) {
        console.error('❌ Postgres connection failed:', err.message);
        process.exit(1);
    }
})();
// Typed query helper
async function query(sql, params) {
    try {
        const res = await pool.query(sql, params);
        return res.rows;
    }
    catch (err) {
        console.error('❌ DB Query Failed:', { sql, params, error: err.message });
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
async function getConnection() {
    const client = await pool.connect();
    const execute = async (sql, params) => {
        const res = await client.query(sql, params);
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
exports.default = pool;
