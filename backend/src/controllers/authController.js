import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
       const {name, email, password, role} = req.body;
       if(!name || !email || !password) {
        return res.status(400).json({message : "All fields are required"});
       }
       
       const existingUser = await User.findOne({email});
       if(existingUser) {
        return res.status(400).json({message : "User already exists"});
       }

       const hashedPassword = await bcrypt.hash(password, 10);
       
       const user = await User.create({
        name,
        email,
        password : hashedPassword,
        role : role || "CITIZEN",
       });

       res.status(201).json({
        message : "User registered successfully",
        user : {
            id: user._id,
            name : user.name,
            email: user.email,
            role : user.role,
        },
       });

    } catch (error){
        res.status(500).json({message : error.message});
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({ message: "Email and password are required"});
        }

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({ message: "Invalid Credentials"});
        }

        const token  = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
                    httpOnly: true, sameSite: "lax", secure: false, maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error){
        res.status(500).json({message : error.message });
    }
};