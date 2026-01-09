// routes/authRoutes.js (or wherever your /me route is)
import express from "express";
import protect from "../middlewares/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// fetch current logged-in user for ANY role
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email role");

    res.status(200).json({
      message: "Current user fetched successfully",
      user, // { id, name, email, role }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
