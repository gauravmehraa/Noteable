import session from 'express-session';
import { Types } from 'mongoose';

declare module 'express-session' {
  export interface SessionData {
    authenticated: boolean;
    user: {
      id: Types.ObjectId;
      username: string;
    };
  }
}