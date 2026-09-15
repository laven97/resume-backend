import { EmaiTypeEnum } from "../enums/email-type.enum.js";
import { EmailPayloadCombine } from "./email-payload-combine.type.js";
import { PickRequired } from "./pick-requered.js";

export type EmailTypeToPayload = {
  [EmaiTypeEnum.WELCOME]: PickRequired<
    EmailPayloadCombine,
    "name" | "actionToken"
  >;

  [EmaiTypeEnum.FORGOT_PASSWORD]: PickRequired<
    EmailPayloadCombine,
    "email" | "name" | "actionToken"
  >;

  [EmaiTypeEnum.OLD_WISIT]: PickRequired<EmailPayloadCombine, "name">;

  [EmaiTypeEnum.LOGOUT]: PickRequired<EmailPayloadCombine, "name">;

  [EmaiTypeEnum.CHANGE_EMAIL]: PickRequired<
    EmailPayloadCombine,
    "email" | "name" | "actionToken"
  >;
};
