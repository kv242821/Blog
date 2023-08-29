import { NextFunction, Request, Response } from "express";
import ServerError from "../utils/ServerError";
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ServerError)
    if(err.statusCode === 401)
      return res.status(401).send({ message: "Unauthorized" });
    else res.status(err.statusCode).send({ message: err.message });
  else{
    console.log(err);
    res.status(500).send({ message: err.message ?? "Internal Server Error" });}
};
