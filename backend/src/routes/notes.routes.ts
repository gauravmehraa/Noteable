import express, { Router } from "express";
import { addNote, deleteNote, getNotes, updateNote } from "../controllers/note.controller";

const router: Router = express.Router();

router.get("/", getNotes);
router.post("/add", addNote);
router.patch("/update/:id", updateNote);
router.delete("/delete/:id", deleteNote);

export default router;