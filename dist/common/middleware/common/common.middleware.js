import { isObjectIdOrHexString } from 'mongoose';
import { ValidationError } from 'joi';
import { ApiError } from '../../errors/api-error.js';
class CommonMiddleware {
    verifyId(key) {
        return (req, res, next) => {
            try {
                const id = req.params[key];
                if (!isObjectIdOrHexString(id)) {
                    throw new ApiError('Invalid ID', 400);
                }
                next();
            }
            catch (err) {
                next(err);
            }
        };
    }
    isBodyValid(validator) {
        return async (req, res, next) => {
            try {
                req.body = await validator.validateAsync(req.body);
                next();
            }
            catch (err) {
                if (err instanceof ValidationError) {
                    next(new ApiError(err.details[0].message, 400));
                    return;
                }
                next(err);
            }
        };
    }
}
export const commonMiddleware = new CommonMiddleware();
