import express from "express";
import {
  placeOrder,
  getUserOrders,
  getOrderDetails,
} from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, placeOrder);
router.get("/", authMiddleware, getUserOrders);
router.get("/:id", authMiddleware, getOrderDetails);

export default router;
