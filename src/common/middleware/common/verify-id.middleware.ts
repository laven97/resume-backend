import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";
import { ApiError } from "../../errors/api-error";

class VerifyId {
  public verifyId(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params[key]

        if (!isObjectIdOrHexString(id)) {
          throw new ApiError("Invalid ID", 400);
        }
        next();
      } catch (err) {
        next(err);
      }
    };
  }
}

export const verifyId = new VerifyId();
