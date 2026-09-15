import Joi from "joi";

import { regexConstant } from "../../auth/constant/regex.constant.js";

export class UserValidation {
  private static email = Joi.string()
    .required()
    .regex(regexConstant.EMAIL)
    .trim()
    .lowercase();
  private static password = Joi.string()
    .required()
    .regex(regexConstant.PASSWORD)
    .min(6);
  private static name = Joi.string().required();
  private static phone = Joi.string().trim().regex(regexConstant.PHONE);

  public static signIn = Joi.object({
    email: this.email,
    password: this.password,
  });

  public static updateUser = Joi.object({
    name: this.name,
    phone: this.phone,
  });

  public static changePassword = Joi.object({
    OldPassword: this.password.required(),
    password: this.password.required(),
  });
}
