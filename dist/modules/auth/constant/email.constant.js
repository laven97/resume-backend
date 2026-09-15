"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailConstant = void 0;
const email_type_enum_1 = require("../enums/email-type.enum");
exports.emailConstant = {
    [email_type_enum_1.EmaiTypeEnum.WELCOME]: {
        subject: "welcome",
        template: "welcome",
    },
    [email_type_enum_1.EmaiTypeEnum.FORGOT_PASSWORD]: {
        subject: "forgot-password",
        template: "forgot-password",
    },
    [email_type_enum_1.EmaiTypeEnum.OLD_WISIT]: {
        subject: "old-visit",
        template: "old-visit",
    },
    [email_type_enum_1.EmaiTypeEnum.LOGOUT]: {
        subject: "logout",
        template: "logout",
    },
    [email_type_enum_1.EmaiTypeEnum.CHANGE_EMAIL]: {
        subject: "change-email",
        template: "change-email",
    },
};
