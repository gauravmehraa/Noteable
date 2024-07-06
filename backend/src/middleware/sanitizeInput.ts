import { Request, Response, NextFunction } from "express";
import sanitizeHtml from "sanitize-html";

const sanitize = (text: string): string => sanitizeHtml(text, {
  allowedTags: [], // none
  allowedAttributes: {} // none
});

const sanitizeInput = (req: Request, res: Response, next: NextFunction): void => {

  // Body
  if(req.body){
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === "string") req.body[key] = sanitize(req.body[key]);
    });
  }

  // Paramters
  if(req.params){
    Object.keys(req.params).forEach(key => {
      if (typeof req.params[key] === "string") req.params[key] = sanitize(req.params[key]);
  
    });
  }

  // Query parameters
  if(req.query){
    Object.keys(req.query).forEach(key => {
      if (typeof req.query[key] === "string") req.query[key] = sanitize(req.query[key]);
    });
  }
  next();
};

export default sanitizeInput;