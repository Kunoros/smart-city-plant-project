const db = require('./db');

async function initDatabase() {
    try {
        // Create tables if not exist
        await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
      );
    `);

        await db.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        price NUMERIC NOT NULL
      );
    `);

        console.log("Tables ensured. Starting server...");

        // Start the main server
        require('./server');

    } catch (err) {
        console.error("Initialization error:", err);
        process.exit(1);
    }
}

initDatabase();
