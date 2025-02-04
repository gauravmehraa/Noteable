import { Schema, Types, model } from "mongoose";

export interface INote{
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  content: string;
  created: Date,
}

const noteSchema = new Schema<INote>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 4,
  },
  content: {
    type: String,
    required: true,
    minlength: 6,
  },
  created: {
    type: Date,
    required: false,
  }
}, { timestamps: true });

const Note = model<INote>("Note", noteSchema);

export default Note;
