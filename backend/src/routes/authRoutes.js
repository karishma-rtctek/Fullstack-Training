import express from "express";
const router = express.Router();

// temp test route
router.get("/", (req, res) => {
  res.send("Auth Route Working");
});

export default router;
