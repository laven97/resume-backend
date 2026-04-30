import { Joi, Segments } from "celebrate";

import { regexConstant } from "../constant/regex.constant";

export class AuthValidation {
  private static email = Joi.string()
    .lowercase()
    .trim()
    .regex(regexConstant.EMAIL)
    .required();
  private static password = Joi.string()
    .min(6)
    .regex(regexConstant.PASSWORD)
    .required();

  public static registerUserSchema = {
    [Segments.BODY]: Joi.object({
      email: this.email,
      password: this.password,
    }),
  };

  public static loginUserSchema = {
    [Segments.BODY]: Joi.object({
      email: this.email,
      password: this.password,
    }),
  };

  public static logoutSchema = {
    [Segments.BODY]: Joi.object({
      refreshToken: Joi.string().required(),
    }),
  };
}
