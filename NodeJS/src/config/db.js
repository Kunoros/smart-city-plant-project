import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config(); // load .env at runtime

const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('error', (err) => {
    console.error('Unexpected PG client error', err);
    process.exit(-1);
});

export default async function connectDB() {
    try {
        await pool.query('SELECT NOW()');
        console.log('Database connected');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
}

export { pool };