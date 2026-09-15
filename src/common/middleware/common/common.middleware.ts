import { NextFunction, Request, Response } from 'express';
import { isObjectIdOrHexString } from 'mongoose';
import Joi from 'joi';
import type { ObjectSchema } from 'joi';

import { ApiError } from '../../errors/api-error.js';

class CommonMiddleware {
  public verifyId(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params[key];

        if (!isObjectIdOrHexString(id)) {
          throw new ApiError('Invalid ID', 400);
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
        if (Joi.isError(err)) {
          next(new ApiError(err.details[0].message, 400));
          return;
        }

        next(err);
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
