import { Schema, Types, model } from "mongoose";

export interface IUser{
  _id: Types.ObjectId;
  name: string;
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
}, { timestamps: true });

const User = model<IUser>("User", userSchema);

export default User;
