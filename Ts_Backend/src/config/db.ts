import { Pool } from 'pg';
import { env } from './env';
console.log("Iam in poll >>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

const pool = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD
});
console.log("DB_HOST:", env.DB_HOST);
console.log("DB_PORT:", env.DB_PORT);
console.log("DB_NAME:", env.DB_NAME);
console.log("DB_USER:", env.DB_USER);
pool.on('connect', () => {
  console.log('✅ PostgreSQL connected');
});
pool.on('error', (err) => {
  console.error('❌ PostgreSQL connection error', err);
});

export default pool;
