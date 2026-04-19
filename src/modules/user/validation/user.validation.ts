import Joi from "joi";
import { regexConstant } from "../../../constants/regex.constant";

export class UserValidation {
  //   private static email = Joi.string()
  //     .required()
  //     .regex(regexConstant.EMAIL)
  //     .trim()
  //     .lowercase();
  //   private static password = Joi.string()
  //     .required()
  //     .regex(regexConstant.PASSWORD)
  //     .min(6);
  private static name = Joi.string().required();
  private static phone = Joi.string().trim().regex(regexConstant.PHONE);

  public static updateUser = Joi.object({
    name: this.name,
    phone: this.phone,
  });
}
