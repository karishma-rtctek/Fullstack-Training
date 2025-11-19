import pool from "./db.js"; // your Postgres Pool

// Wrapper function to mimic mysql2
const query = async (text, params = []) => {
  // Replace '?' placeholders with Postgres-style $1, $2, ...
  let index = 1;
  const sql = text.replace(/\?/g, () => `$${index++}`);
  try {
    const { rows } = await pool.query(sql, params);
    return [rows]; // mimic mysql2 -> [rows, fields]
  } catch (err) {
    throw err;
  }
};

// Export a single object that supports both .query and .execute
const db = {
  query,
  execute: query, // now you can use db.execute() as in mysql2
};

export default db;
