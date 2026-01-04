import express from 'express';
import { registerUser, loginUser, signOut } from '../controllers/authController.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/signout",signOut)

export default router;