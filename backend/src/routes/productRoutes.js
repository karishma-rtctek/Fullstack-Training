import express from "express";
import {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// CRUD
router.post("/", authMiddleware, addProduct);      // admin protected
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", authMiddleware, updateProduct); // admin protected
router.delete("/:id", authMiddleware, deleteProduct); // admin protected

export default router;
