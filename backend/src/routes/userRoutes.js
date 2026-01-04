import express from "express";
import protect from "../middlewares/authMiddleware.js"
import authorize from "../middlewares/roleMiddleware.js"

const router = express.Router();

router.get("/home",protect,authorize("CITIZEN"),
    (req, res) => {
        res.status(200).json({message: "Welcome to Citizen Home",user: req.user});
    }
);

export default router