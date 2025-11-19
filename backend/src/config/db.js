// import mysql from "mysql2";
// import dotenv from "dotenv";
// dotenv.config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD || "",
//   database: process.env.DB_NAME,
//   port: Number(process.env.DB_PORT) || 3306,
//   connectionLimit: 10, // optional but recommended
// });

// // Optional: Test DB Connection
// pool.getConnection((err, conn) => {
//   if (err) {
//     console.error("❌ MySQL Connection Failed:", err.message);
//   } else {
//     console.log("✅ MySQL Connected Successfully!");
//     conn.release();
//   }
// });

// // Export promise-based pool
// export default pool.promise();









// postgress ====================
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 5432,
  ssl: {
    rejectUnauthorized: false, // ⭐ allows connecting to Render Postgres
  },
});

pool.connect()
  .then(() => console.log("✅ Postgres Connected Successfully!"))
  .catch((err) => console.error("❌ Postgres Connection Failed:", err.message));

export default pool;
