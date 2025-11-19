import express from "express";
// import db from "../config/db.js";
import db from "../config/dbWrapper.js";

const router = express.Router();

/* =============================
    GET ALL PRODUCTS (WITH PAGINATION)
============================= */
router.get("/", async (req, res) => {
  try {
    // Page number from query params — default is page 1
    const page = parseInt(req.query.page) || 1;

    // Number of products to show per page (6 = 3x2 UI grid)
    const limit = 6;

    // Calculate how many items to skip
    const offset = (page - 1) * limit;

    // Fetch products for this page
    const [products] = await db.query(
      "SELECT * FROM products LIMIT ? OFFSET ?",
      [limit, offset]
    );

    // Get total number of products to compute total pages
    const [[{ total }]] = await db.query(
      "SELECT COUNT(*) as total FROM products"
    );

    // Send paginated response
    res.json({
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

/* =============================
    GET PRODUCT BY ID
============================= */
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0)
      return res.status(404).json({ message: "Not Found" });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =============================
    CREATE PRODUCT
============================= */
router.post("/", async (req, res) => {
  const { name, price, description, image } = req.body;

  try {
    const [result] = await db.execute(
      "INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)",
      [name, price, description, image]
    );

    res.json({ id: result.insertId, name, price, description, image });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =============================
    UPDATE PRODUCT
============================= */
router.put("/:id", async (req, res) => {
  const { name, price, description, image } = req.body;

  try {
    const [result] = await db.execute(
      `UPDATE products 
       SET name=?, price=?, description=?, image=? 
       WHERE id=?`,
      [name, price, description, image, req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Product Not Found" });

    res.json({ message: "Updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =============================
    DELETE PRODUCT
============================= */
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.execute("DELETE FROM products WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Product Not Found" });

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
