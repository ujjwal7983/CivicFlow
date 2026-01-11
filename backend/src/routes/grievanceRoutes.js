import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/roleMiddleware.js";
import { assignGrievance, getAssignedGrievances, startGrievance, resolveGrievance} from "../controllers/grievanceController.js";
import { createGrievance, getMyGrievances, getAllGrievances } from "../controllers/grievanceController.js";
import { getData } from "../controllers/adminController.js";

const router = express.Router();

router.post("/", protect, authorize("CITIZEN"), createGrievance);
router.get("/my", protect, authorize("CITIZEN"), getMyGrievances);

router.get("/all", protect, authorize("ADMIN"), getAllGrievances)
router.get("/getData",protect,authorize("ADMIN"), getData);
router.patch("/:id/assign", protect, authorize("ADMIN"), assignGrievance);
router.get("/assigned", protect, authorize("OFFICER"), getAssignedGrievances);
router.patch("/:id/start", protect, authorize("OFFICER"), startGrievance);
router.patch("/:id/resolve", protect, authorize("OFFICER"), resolveGrievance);

export default router;
