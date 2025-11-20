import express from "express";
import pool from "../config/dbWrapper.js";

const router = express.Router();

/* =============================
    GET CART ITEMS (WITH PRODUCT DETAILS)
============================= */
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT 
    cart.id AS "cartId",
    products.id AS "productId",
    products.title AS name,
    products.price,
    products.image,
    cart.quantity
FROM cart
JOIN products ON cart.product_id = products.id
`
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =============================
    ADD TO CART
============================= */
router.post("/add", async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  try {
    // 1️⃣ Check if product is already in cart
    const [existing] = await pool.query(
      "SELECT * FROM cart WHERE product_id = ?",
      [productId]
    );

    if (existing.length > 0) {
      // 2️⃣ If exists → increment quantity
      await pool.query(
        "UPDATE cart SET quantity = quantity + ? WHERE product_id = ?",
        [quantity, productId]
      );
    } else {
      // 3️⃣ If not exists → insert new row
      await pool.query(
        "INSERT INTO cart (product_id, quantity) VALUES (?, ?)",
        [productId, quantity]
      );
    }

    res.json({ message: "Cart updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* =============================
    UPDATE QUANTITY
============================= */
router.put("/update/:cartId", async (req, res) => {
  const { quantity } = req.body;

  try {
    await pool.execute("UPDATE cart SET quantity=? WHERE id=?", [
      quantity,
      req.params.cartId,
    ]);

    res.json({ message: "Quantity updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =============================
    DELETE CART ITEM
============================= */
router.delete("/remove/:cartId", async (req, res) => {
  try {
    await pool.execute("DELETE FROM cart WHERE id=?", [req.params.cartId]);

    res.json({ message: "Removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
