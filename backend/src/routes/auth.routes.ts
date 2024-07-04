import express, { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller";
import protectRoute from "../middleware/protectRoute";

const router: Router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", protectRoute, logout);

export default router;