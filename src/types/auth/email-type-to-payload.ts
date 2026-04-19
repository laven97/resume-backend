import { EmaiTypeEnum } from "../../enums/auth/email-type.enum";
import { EmailPayloadCombine } from "./email-payload-combine.type";
import { PickRequired } from "./pick-requered";

export type EmailTypeToPayload = {
  [EmaiTypeEnum.WElCOME]: PickRequired<
    EmailPayloadCombine,
    "name" | "actionToken"
  >;

  [EmaiTypeEnum.FROGOT_PASSWORD]: PickRequired<
    EmailPayloadCombine,
    "email" | "name" | "actionToken"
  >;

  [EmaiTypeEnum.OLD_WISIT]: PickRequired<EmailPayloadCombine, "name">;

  [EmaiTypeEnum.LOGOUT]: PickRequired<EmailPayloadCombine, "name">;
};
