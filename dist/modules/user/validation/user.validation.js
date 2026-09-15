"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const regex_constant_1 = require("../../auth/constant/regex.constant");
class UserValidation {
    static email = joi_1.default.string()
        .required()
        .regex(regex_constant_1.regexConstant.EMAIL)
        .trim()
        .lowercase();
    static password = joi_1.default.string()
        .required()
        .regex(regex_constant_1.regexConstant.PASSWORD)
        .min(6);
    static name = joi_1.default.string().required();
    static phone = joi_1.default.string().trim().regex(regex_constant_1.regexConstant.PHONE);
    static signIn = joi_1.default.object({
        email: this.email,
        password: this.password,
    });
    static updateUser = joi_1.default.object({
        name: this.name,
        phone: this.phone,
    });
    static changePassword = joi_1.default.object({
        OldPassword: this.password.required(),
        password: this.password.required(),
    });
}
exports.UserValidation = UserValidation;
