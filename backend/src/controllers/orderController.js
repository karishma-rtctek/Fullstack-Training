import pool from "../config/dbWrapper.js";

// CREATE ORDER
export const placeOrder = async (req, res) => {
  const { cartItems, totalAmount } = req.body;
  const userId = req.user.id;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    // Insert order
    const [orderResult] = await connection.query(
      "INSERT INTO orders (user_id, total) VALUES (?, ?)",
      [userId, totalAmount]
    );

    const orderId = orderResult.insertId;

    // Insert order items
    for (let item of cartItems) {
      await connection.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, item.id, item.quantity, item.price]
      );
    }

    await connection.commit();
    connection.release();

    res.json({ message: "Order placed", orderId });
  } catch (err) {
    console.error("Order Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET USER ORDERS
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const [orders] = await pool.query(
      "SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC",
      [userId]
    );

    res.json(orders);
  } catch (err) {
    console.error("Get User Orders Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET ORDER DETAILS + ITEMS
export const getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Fetch order
    const [orderRows] = await pool.query(
      "SELECT * FROM orders WHERE id = ?",
      [orderId]
    );

    if (orderRows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const order = orderRows[0];

    // Fetch items (FIXED SQL)
    const itemsQuery = `
      SELECT 
        oi.*, 
        p.name AS product_name, 
        p.image AS product_image
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `;

    const [items] = await pool.query(itemsQuery, [orderId]);

    res.json({ order, items });
  } catch (err) {
    console.error("Order Detail Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
