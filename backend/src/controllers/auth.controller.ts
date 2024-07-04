import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import bcrypt from "bcryptjs";
import generateToken from "../utils/token";

export const register = async (req: Request, res: Response): Promise<void> => {
  try{
    const { name, username, password, confirmPassword } = req.body;

    if(password !== confirmPassword){
      res.status(400).json({error: "Passwords do not match"});
      return;
    }
    
    const user: IUser | null = await User.findOne({ username });
    
    if(user){
      res.status(400).json({error: "Username already exists"});
      return;
    }
    
    //password hashing using bcrypt
    const passwordSalt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, passwordSalt);

    const newUser = new User({ 
      name,
      username,
      password: hashedPassword,
    });
    if(newUser){
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        username: newUser.username,
      });
    }
    else{
      res.status(400).json({error: "Invalid User Data"});
    }
  }
  catch (error) {
    console.log("Error in Register User controller", (error as Error).message);
    res.status(500).json({error: "Internal Server Error"});
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try{
    const { username, password } = req.body;
    const user: IUser | null = await User.findOne({ username });

    if (!user || !user.password) {
      res.status(400).json({ error: "Invalid username or password" });
      return;
    }

    const validPassword: boolean = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status(400).json({ error: "Invalid username or password" });
      return;
    }

    generateToken(user._id, res);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
    });
  }
  catch(error){
    console.log("Error in Login User controller", (error as Error).message);
    res.status(500).json({error: "Internal Server Error"});
  }
}

export const logout = async (req: Request, res: Response): Promise<void> => {
  try{
    const username: string = req.user.username;
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: `Logged out successfully from ${username}`});
  }
  catch(error){
    console.log("Error in Logout User controller", (error as Error).message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}