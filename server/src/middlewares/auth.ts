import { Request, Response, NextFunction } from "express";
import env from "../utils/envalid";
import ServerError from "../utils/ServerError";
import jwt from "jsonwebtoken";

export interface JWTPayload {
  _id: string;
  iat: number;
}

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const AuthToken = req.headers["authorization"]?.split(" ")[1];
  if (!AuthToken) throw new ServerError(401, "Unauthorised");
  try{
    const decoded = <JWTPayload>jwt.verify(AuthToken, env.JWT_SECRET);
    req.userId = decoded._id;
  }catch(error) {
    throw new ServerError(401, "Unauthorised");
  }
  next();
};

export default isAuthenticated;
