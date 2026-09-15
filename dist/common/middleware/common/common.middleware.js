"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonMiddleware = void 0;
const mongoose_1 = require("mongoose");
const api_error_1 = require("../../errors/api-error");
class CommonMiddleware {
    verifyId(key) {
        return (req, res, next) => {
            try {
                const id = req.params[key];
                if (!(0, mongoose_1.isObjectIdOrHexString)(id)) {
                    throw new api_error_1.ApiError("Invalid ID", 400);
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
                if (err && typeof err === "object" && "details" in err) {
                    const error = err;
                    next(new api_error_1.ApiError(error.details[0].message, 400));
                }
            }
        };
    }
}
exports.commonMiddleware = new CommonMiddleware();
