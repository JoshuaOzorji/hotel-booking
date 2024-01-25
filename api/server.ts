import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

mongoose.connect(process.env.MONGODB as string);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:5173",
		credentials: true,
	}),
);

// app.get("/backend/test", async (req: Request, res: Response) => {
// 	res.json({ message: "hello from express endpoint" });
// });

app.listen(7000, () => {
	console.log("Server is running on port 7000");
});
