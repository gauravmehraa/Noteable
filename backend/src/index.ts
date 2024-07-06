import express, { Express } from "express";
import dotenv from "dotenv";
import session from "express-session";

import authRoutes from "./routes/auth.routes";
import noteRoutes from "./routes/notes.routes";

import protectRoute from "./middleware/protectRoute";
import sanitizeInput from "./middleware/sanitizeInput";

import connectToDB from "./db/connect";
import MongoStore from "connect-mongo";

dotenv.config();

const PORT: string = process.env.PORT || "8080";

const app: Express = express();

if(!process.env.MONGODB_URL){
  throw new Error("No DB URL defined");
}
if(!process.env.SESSION_SECRET){
  throw new Error("No session secret defined");
}

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
  cookie: {
    maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    httpOnly: true, // XSS safe
    sameSite: 'strict', // CSRF safe
    secure: process.env.NODE_ENV !== 'dev' // HTTPS in production
  }
}));

app.use(sanitizeInput);
app.use("/api/auth", authRoutes);
app.use("/api/notes", protectRoute, noteRoutes);

app.listen(PORT, async () => {
  connectToDB();
  console.log(`Server running on port ${PORT}`);
});