import pool from "../config/db.js";

// CREATE PRODUCT
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    if (!name || !price)
      return res.status(400).json({ message: "Name and price are required" });

    const [result] = await pool.query(
      "INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)",
      [name, description, price, image]
    );

    res.json({ message: "Product added", productId: result.insertId });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// GET SINGLE PRODUCT
export const getProductById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0)
      return res.status(404).json({ message: "Product not found" });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    const [result] = await pool.query(
      "UPDATE products SET name=?, description=?, price=?, image=? WHERE id=?",
      [name, description, price, image, req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product updated" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM products WHERE id=?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
