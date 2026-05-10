import { EmaiTypeEnum } from "../enums/email-type.enum";

export const emailConstant = {
  [EmaiTypeEnum.WELCOME]: {
    subject: "welcome",
    template: "welcome",
  },
  [EmaiTypeEnum.FORGOT_PASSWORD]: {
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
