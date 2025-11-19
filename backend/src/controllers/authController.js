// import pool from "../config/db.js";
import pool from "../config/dbWrapper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Signup
export const signup = async (req, res) => {
  try {
    console.log("📩 SIGNUP REQUEST BODY:", req.body);

    const { name, email, password } = req.body;

    // test DB connection
    const [test] = await pool.query("SELECT 1 + 1 AS test");
    console.log("🟢 DB TEST:", test);

    // check existing user
    const [existing] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    console.log("👤 EXISTING USER:", existing);

    // hash password
    const hashed = await bcrypt.hash(password, 10);
    console.log("🔐 HASHED PASSWORD:", hashed);

    // insert user
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashed]
    );

    return res.json({ message: "Signup successful" });

  } catch (err) {
    console.error("❌ SIGNUP ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0)
      return res.status(400).json({ message: "Invalid email or password" });

    const user = users[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
