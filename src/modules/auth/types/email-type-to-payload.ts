import { EmaiTypeEnum } from "../enums/email-type.enum";
import { EmailPayloadCombine } from "./email-payload-combine.type";
import { PickRequired } from "./pick-requered";

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
};
