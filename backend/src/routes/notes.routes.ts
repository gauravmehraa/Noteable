import express, { Router } from "express";
import { addNote, deleteNote, getNotes, updateNote } from "../controllers/note.controller";
import protectRoute from "../middleware/protectRoute";

const router: Router = express.Router();

router.get("/", protectRoute, getNotes);
router.post("/add", protectRoute, addNote);
router.patch("/update/:id", protectRoute, updateNote);
router.delete("/delete/:id", protectRoute, deleteNote);

export default router;