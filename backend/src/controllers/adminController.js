import bcrypt from "bcrypt";
import User from "../models/User.js";
import Grievance from "../models/Grievance.js";

export const createOfficer = async (req, res) => {
    try {
        let { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Officer already exists" });
        }

        let hashedPassword = await bcrypt.hash(password, 10);

        let newUser = await User.create({
            name,
            email,
            role,
            password: hashedPassword
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

export const getData = async (req, res) => {
    try {
        let citizen = await User.find({ role: "CITIZEN" });
        let officers = await User.find({ role: { $in: ["OFFICER", "HEAD"] } });
        let solved = await Grievance.find({ status: "RESOLVED" });
        let unSolved = await Grievance.find({ status: { $nin: ["RESOLVED"] } })

        res.status(200).json({
            citizenCount: citizen.length,
            officersCount: officers.length,
            solvedCount: solved.length,
            unSolvedCount: unSolved.length,
            officers
        });

    } catch (err) {
        res.status(500).json({message : "Server Error"});
    }

}

export const getOfficersData = async (req, res) =>{
    try {
        let officers = await User.find({role : {$in : ["OFFICER","HEAD"]}});
        let grievances = await Grievance.find().populate("assignedTo","_id");

        res.status(200).json({officers, grievances});

    } catch (err) {
        res.status(500).json({message : "Internal Server Error"});
    }
}