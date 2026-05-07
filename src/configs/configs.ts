import dotenv from "dotenv";
import { StringValue } from "ms";

dotenv.config();

export const configs = {
  APP_PORT: process.env.APP_PORT || 3001,

  MONGO_URL: process.env.MONGO_URL,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as StringValue,
  JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION as StringValue,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as StringValue,
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION as StringValue,

  APP_FRON_URL: process.env.APP_FRON_URL,


  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMPT_PASSWORD: process.env.SMPT_PASSWORD,
  SMTP_FROM: process.env.SMTP_FROM,
  SMTP_USER: process.env.SMTP_USER,

  ACTION_FORGOT_PASSWORD_SECRET: process.env
    .ACTION_FORGOT_PASSWORD_SECRET as StringValue ,
  ACTION_FORGOT_PASSWORD_EXPIRESIN: process.env
    .ACTION_FORGOT_PASSWORD_EXPIRESIN as StringValue,
  ACTION_VERIFY_EMAIL_SECRET: process.env
    .ACTION_VERIFY_EMAIL_SECRET as StringValue,
  ACTION_VERIFY_EMAIL_EXPIRESIN: process.env
    .ACTION_VERIFY_EMAIL_EXPIRESIN as StringValue,
};
