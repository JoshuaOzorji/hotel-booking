import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import authRoutes from "../api/routes/auth.route";
import userRoutes from "../api/routes/users.route";
import cookieParser from "cookie-parser";

mongoose.connect(process.env.MONGODB as string);

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:5173",
		credentials: true,
	}),
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.listen(7000, () => {
	console.log("Server is running on port 7000");
});
