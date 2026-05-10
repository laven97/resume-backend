import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../../errors/api-error";
import { ObjectSchema } from "joi";

class CommonMiddleware {
  public verifyId(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params[key];

        if (!isObjectIdOrHexString(id)) {
          throw new ApiError("Invalid ID", 400);
        }
        next();
      } catch (err) {
        next(err);
      }
    };
  }

  public isBodyValid(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = await validator.validateAsync(req.body);
        next();
      } catch (err) {
        if (err && typeof err === "object" && "details" in err) {
          const error = err as any;
          next(new ApiError(error.details[0].message, 400));
        }
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
