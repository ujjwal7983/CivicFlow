import express from "express";
import protect from "../middlewares/authMiddleware.js"
import authorize from "../middlewares/roleMiddleware.js"
import User from "../models/User.js"

const router = express.Router();

router.get("/home",protect,authorize("CITIZEN"),
    async (req, res) => {
        try {
      const user = await User.findById(req.user.id).select(
        "name email role"
      );

      res.status(200).json({
        message: "Welcome to Citizen Home",
        user,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    }
);

export default router