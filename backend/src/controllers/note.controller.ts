import { Request, Response } from "express";
import Note, { INote } from "../models/note.model";
import { Types } from "mongoose";

export const getNotes = async (req: Request, res: Response): Promise<void> => {
  try{
    const userId: Types.ObjectId = req.session.user?.id as Types.ObjectId;
    const notes: INote[] = await Note.find({
      userId: { $eq: userId }
    }).select("-__v");
    res.status(200).json(notes);
  }
  catch (error) {
    console.log("Error in Get Notes controller", (error as Error).message);
    res.status(500).json({error: "Internal Server Error"});
  }
}

export const addNote = async (req: Request, res: Response): Promise<void> => {
  try{
    const { title, content } = req.body;
    const userId: Types.ObjectId = req.session.user?.id as Types.ObjectId;

    // Validate title
    if(title.length < 6){
      res.status(400).json({error: "Title is too short."});
      return;
    }

    // Validate content
    if(content.length < 6){
      res.status(400).json({error: "Content is too short."});
      return;
    }

    const newNote = new Note({
      userId, title, content, created: new Date()
    })

    if(newNote){
      newNote.save();
      res.status(201).json({
        _id: newNote._id,
        userId: newNote.userId,
        title: newNote.title,
        content: newNote.content,
        created: newNote.created,
      });
    }
    else{
      res.status(400).json({error: "Invalid Note Data"});
    }
  }
  catch (error) {
    console.log("Error in Add Note controller", (error as Error).message);
    res.status(500).json({error: "Internal Server Error"});
  }
}

export const updateNote = async(req: Request, res: Response): Promise<void> => {
  try{
    const { id: noteId } = req.params;
    const userId: Types.ObjectId = req.session.user?.id as Types.ObjectId;
    const { title, content } = await req.body;

    const updatedData: any = { title, content };

    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId },
      updatedData,
      { new: true }
    );

    if(!note){
      res.status(500).json({error: "No note to be edited"});
      return;
    }

    await note.save();
    res.status(200).json(note);
  }
  catch (error) {
    console.log("Error in Update Note controller", (error as Error).message);
    res.status(500).json({error: "Internal Server Error"});
  }
}

export const deleteNote = async(req: Request, res: Response): Promise<void> => {
  try{
    const { id: noteId } = req.params;
    const userId: Types.ObjectId = req.session.user?.id as Types.ObjectId;

    const note = await Note.findOne({
      _id: noteId,
      userId
    });
    
    if(!note){
      res.status(500).json({error: "No note to be deleted"});
      return;
    }

    await Note.findByIdAndDelete(noteId);
    res.status(200).json({message: "Note successfully deleted"});
  }
  catch (error) {
    console.log("Error in Delete Note controller", (error as Error).message);
    res.status(500).json({error: "Internal Server Error"});
  }
}