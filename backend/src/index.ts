import express, { Express } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import noteRoutes from "./routes/notes.routes";
import connectToDB from "./db/connect";

dotenv.config();

const PORT: string = process.env.PORT || "8080";

const app: Express = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.listen(PORT, async () => {
  connectToDB();
  console.log(`Server running on port ${PORT}`);
});