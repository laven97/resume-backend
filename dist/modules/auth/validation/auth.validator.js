"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const celebrate_1 = require("celebrate");
const regex_constant_1 = require("../constant/regex.constant");
class AuthValidation {
    static email = celebrate_1.Joi.string()
        .lowercase()
        .trim()
        .regex(regex_constant_1.regexConstant.EMAIL)
        .required();
    static password = celebrate_1.Joi.string()
        .min(6)
        .regex(regex_constant_1.regexConstant.PASSWORD)
        .required();
    static registerUserSchema = {
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
            email: this.email,
            password: this.password,
        }),
    };
    static loginUserSchema = {
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
            email: this.email,
            password: this.password,
        }),
    };
    static logoutSchema = {
        [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
            refreshToken: celebrate_1.Joi.string().required(),
        }),
    };
}
exports.AuthValidation = AuthValidation;
