import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import bcrypt from "bcryptjs";

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
    
    // password hashing using bcrypt
    const passwordSalt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, passwordSalt);

    const newUser = new User({ 
      name,
      username,
      password: hashedPassword,
    });

    await newUser.save();
    req.session.authenticated = true;
    req.session.user = {
      id: newUser._id,
      username: newUser.username
    }

    res.status(201).json(req.session);
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

    req.session.authenticated = true;
    req.session.user = {
      id: user._id,
      username: user.username
    }

    res.status(200).json(req.session);
  }
  catch(error){
    console.log("Error in Login User controller", (error as Error).message);
    res.status(500).json({error: "Internal Server Error"});
  }
}

export const logout = async (req: Request, res: Response): Promise<void> => {
  try{
    req.session.destroy((error) => {
      if(error){
        throw new Error("Error destroying session")
      }
      else{
        res.clearCookie('connect.sid');
        res.status(200).json({ message: "Logged out successfully" });
      }
    });
  }
  catch(error){
    console.log("Error in Logout User controller", (error as Error).message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}