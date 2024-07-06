import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/user.model";

const protectRoute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    if(!req.session.authenticated){
      res.status(401).json({error: "Unauthorized - Session expired"});
      return;
    }

    const userId = req.session.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized - Invalid session userID" });
      return
    }

    const user: IUser | null = await User.findById(req.session.user?.id).select("-password");

    if(!user){
      res.status(404).json({error: "User not found"});
      return;
    }
    
    next();
  }
  catch (error){
    console.log("Error in protect route middleware", (error as Error).message);
    res.status(500).json({error: "Internal Server Error"});
  }
}

export default protectRoute;