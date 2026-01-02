import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/roleMiddleware.js";
import AuditLog from "../models/AuditLog.js";

const router = express.Router();

router.get(
  "/:grievanceId",
  protect,
  authorize("ADMIN", "HEAD"),
  async (req, res) => {
    const logs = await AuditLog.find({
      grievance: req.params.grievanceId,
    })
      .populate("performedBy", "name role")
      .sort({ createdAt: 1 });

    res.json({ count: logs.length, logs });
  }
);

export default router;
