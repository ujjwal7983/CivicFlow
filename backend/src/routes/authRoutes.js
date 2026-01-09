import express from 'express';
import { registerUser, loginUser, signOut } from '../controllers/authController.js';
import { createOfficer } from '../controllers/adminController.js'
import protect from '../middlewares/authMiddleware.js'
import authorize from '../middlewares/roleMiddleware.js'


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/create", protect, authorize("ADMIN"), createOfficer)
router.get("/signout",signOut)

export default router;