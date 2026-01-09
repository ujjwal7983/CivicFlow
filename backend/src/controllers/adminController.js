import bcrypt from "bcrypt";
import User from "../models/User.js";

export const createOfficer = async (req , res) => {
    try {
        let {name,email,password,role} = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Officer already exists" });
        }

        let hashedPassword = await bcrypt.hash(password,10);

        let newUser = await User.create({
            name,
            email,
            role,
            password : hashedPassword
        });

        return res.status(201).json({
            message: "Officer created successfully",
                user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}