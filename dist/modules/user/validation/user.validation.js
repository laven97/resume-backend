import Joi from "joi";
import { regexConstant } from "../../auth/constant/regex.constant.js";
export class UserValidation {
    static email = Joi.string()
        .required()
        .regex(regexConstant.EMAIL)
        .trim()
        .lowercase();
    static password = Joi.string()
        .required()
        .regex(regexConstant.PASSWORD)
        .min(6);
    static name = Joi.string().required();
    static phone = Joi.string().trim().regex(regexConstant.PHONE);
    static signIn = Joi.object({
        email: this.email,
        password: this.password,
    });
    static updateUser = Joi.object({
        name: this.name,
        phone: this.phone,
    });
}
