import express from "express";
import { getUsers, createUser } from "../controllers/userController.js";

const router = express.Router();

// GET /api/user → list all users
router.get("/", getUsers);

// POST /api/user → create a new user
router.post("/", createUser);

export default router;
