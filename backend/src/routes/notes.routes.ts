import express, { Router } from "express";

const router: Router = express.Router();

router.get("/", () => {});
router.post("/add", () => {});
router.post("/update", () => {});
router.post("/delete", () => {});

export default router;