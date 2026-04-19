import { EmaiTypeEnum } from "../../enums/auth/email-type.enum";

export const emailConstant = {
  [EmaiTypeEnum.WElCOME]: {
    subject: "welcome",
    template: "welcome",
  },
  [EmaiTypeEnum.FROGOT_PASSWORD]: {
    subject: "forgot-password",
    template: "forgot-password",
  },
  [EmaiTypeEnum.OLD_WISIT]: {
    subject: "old-visit",
    template: "old-visit",
  },
  [EmaiTypeEnum.LOGOUT]: {
    subject: "logout",
    template: "logout",
  },
};
