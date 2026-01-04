import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import authRoutes from "./routes/authRoutes.js";    
import protect from "./middlewares/authMiddleware.js";
import testRoutes from "./routes/testRoutes.js";
import grievanceRoutes from "./routes/grievanceRoutes.js";
import escalationJob from "./jobs/escalationJob.js";
import auditRoutes from "./routes/auditRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();
escalationJob();


const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true,
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Grievance is running...");
});

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});


// TEMP TEST ROUTE
// app.get("/test-user", async (req, res) => {
//   try {
//     const user = await User.create({
//       name: "Sample Citizen",
//       email: `test${Date.now()}@gmail.com`,
//       password: "test1234",
//       role: "CITIZEN",
//     });

//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/grievances", grievanceRoutes);
app.use("/api/audit", auditRoutes);
app.use("/api", userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
