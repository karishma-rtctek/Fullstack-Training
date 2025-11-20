// config/dbWrapper.js
import pkg from "pg"; // Import the entire 'pg' package
import dotenv from "dotenv"; // Import dotenv to load environment variables
dotenv.config();

const { Pool } = pkg; // Destructure Pool from the pg package so to access the other modules if needed

// Create Postgres pool
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 5432,
  ssl: {
    rejectUnauthorized: false, // allows connecting to Render Postgres
  },
});

pool.connect()
  .then(() => console.log("✅ Postgres Connected Successfully!"))
  .catch((err) => console.error("❌ Postgres Connection Failed:", err.message));

// Wrapper to mimic mysql2 syntax
const query = async (text, params = []) => {
  // replace '?' with $1, $2...
  let index = 1;
  const sql = text.replace(/\?/g, () => `$${index++}`);
  try {
    const { rows } = await pool.query(sql, params);
    return [rows]; // mimic mysql2 -> [rows, fields]
  } catch (err) {
    throw err;
  }
};

const db = {
  query,
  execute: query, // allows db.execute() too
};

export default db;
