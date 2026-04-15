import { NextFunction, Request, Response } from "express";
import { isHttpError } from "http-errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isHttpError(err)) {
    return res.status(err.status).json({ message: err.message || err.name });
  }

  res.status(500).json({ message: "Something went wrong" });
};
