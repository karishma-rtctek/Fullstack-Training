import express from "express";
// import db from "../config/db.js";
import db from "../config/dbWrapper.js";

const router = express.Router();

/* =============================
    GET CART ITEMS (WITH PRODUCT DETAILS)
============================= */
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT 
         cart.id AS cartId,
         products.id AS productId,
         products.name,
         products.price,
         products.image,
         cart.quantity
       FROM cart
       JOIN products ON cart.product_id = products.id`
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
  const { productId, quantity } = req.body;

  try {
    await db.execute(
      "INSERT INTO cart (product_id, quantity) VALUES (?, ?)",
      [productId, quantity]
    );

    res.json({ message: "Added to cart" });
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
    await db.execute("UPDATE cart SET quantity=? WHERE id=?", [
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
    await db.execute("DELETE FROM cart WHERE id=?", [req.params.cartId]);

    res.json({ message: "Removed from cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
