import { Joi, Segments } from "celebrate";
import { regexConstant } from "../constant/regex.constant.js";
export class AuthValidation {
    static email = Joi.string()
        .lowercase()
        .trim()
        .regex(regexConstant.EMAIL)
        .required();
    static password = Joi.string()
        .min(6)
        .regex(regexConstant.PASSWORD)
        .required();
    static registerUserSchema = {
        [Segments.BODY]: Joi.object({
            email: this.email,
            password: this.password,
        }),
    };
    static loginUserSchema = {
        [Segments.BODY]: Joi.object({
            email: this.email,
            password: this.password,
        }),
    };
    static logoutSchema = {
        [Segments.BODY]: Joi.object({
            refreshToken: Joi.string().required(),
        }),
    };
}
