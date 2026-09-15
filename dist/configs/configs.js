"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.configs = {
    APP_PORT: process.env.APP_PORT || 3001,
    MONGO_URL: process.env.MONGO_URL,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION,
    APP_FRON_URL: process.env.APP_FRON_URL,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_FROM: process.env.SMTP_FROM,
    SMTP_USER: process.env.SMTP_USER,
    ACTION_FORGOT_PASSWORD_SECRET: process.env
        .ACTION_FORGOT_PASSWORD_SECRET,
    ACTION_FORGOT_PASSWORD_EXPIRESIN: process.env
        .ACTION_FORGOT_PASSWORD_EXPIRESIN,
    ACTION_VERIFY_EMAIL_SECRET: process.env
        .ACTION_VERIFY_EMAIL_SECRET,
    ACTION_VERIFY_EMAIL_EXPIRESIN: process.env
        .ACTION_VERIFY_EMAIL_EXPIRESIN,
};
