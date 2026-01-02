import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Any logged-in user
router.get("/user", protect, (req, res) => {
  res.json({ message: "Any authenticated user", user: req.user });
});

// Only OFFICER or ADMIN
router.get("/officer", protect, authorize("OFFICER", "ADMIN"), (req, res) => {
  res.json({ message: "Officer access granted" });
});

// Only ADMIN
router.get("/admin", protect, authorize("ADMIN"), (req, res) => {
  res.json({ message: "Admin access granted" });
});

export default router;
