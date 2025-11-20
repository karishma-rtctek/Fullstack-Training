import pool from "../config/dbWrapper.js";

export const getCart = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.id AS cartId, c.product_id, p.name, p.image, p.price, c.quantity
       FROM cart c
       JOIN products p ON c.product_id = p.id`
    );

    res.json(result.rows); // must match your CartItem interface
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

export const updateCart = async (req, res) => {
  const { cartId } = req.params;
  const { quantity } = req.body;

  try {
    await pool.query("UPDATE cart SET quantity = $1 WHERE id = $2", [
      quantity,
      cartId,
    ]);
    res.json({ message: "Cart updated" });
  } catch (err) {
    console.error("Error updating cart:", err);
    res.status(500).json({ message: "Failed to update cart" });
  }
};

export const removeCartItem = async (req, res) => {
  const { cartId } = req.params;
  try {
    await pool.query("DELETE FROM cart WHERE id = $1", [cartId]);
    res.json({ message: "Item removed" });
  } catch (err) {
    console.error("Error removing cart item:", err);
    res.status(500).json({ message: "Failed to remove item" });
  }
};
