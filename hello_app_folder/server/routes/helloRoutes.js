import express from "express";
import { sayHello } from "../controllers/helloController.js";

const router = express.Router();

// GET /api/hello
router.get("/", sayHello);

export default router;
