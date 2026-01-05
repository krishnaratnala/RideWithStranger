"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const env_1 = require("./env");
console.log("Iam in poll >>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
const pool = new pg_1.Pool({
    host: env_1.env.DB_HOST,
    port: env_1.env.DB_PORT,
    database: env_1.env.DB_NAME,
    user: env_1.env.DB_USER,
    password: env_1.env.DB_PASSWORD
});
console.log("DB_HOST:", env_1.env.DB_HOST);
console.log("DB_PORT:", env_1.env.DB_PORT);
console.log("DB_NAME:", env_1.env.DB_NAME);
console.log("DB_USER:", env_1.env.DB_USER);
pool.on('connect', () => {
    console.log('✅ PostgreSQL connected');
});
pool.on('error', (err) => {
    console.error('❌ PostgreSQL connection error', err);
});
exports.default = pool;
