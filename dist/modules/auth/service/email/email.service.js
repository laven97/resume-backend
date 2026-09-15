"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const configs_1 = require("../../../../configs/configs");
const email_constant_1 = require("../../constant/email.constant");
class EmailService {
    transporter;
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: configs_1.configs.SMTP_HOST,
            port: Number(configs_1.configs.SMTP_PORT),
            auth: {
                user: configs_1.configs.SMTP_USER,
                pass: configs_1.configs.SMTP_PASSWORD,
            },
        });
        const hbsOption = {
            viewEngine: {
                extname: ".hbs",
                defaultLayout: "main",
                layoutsDir: path_1.default.join(process.cwd(), "src", "modules", "auth", "templates", "layouts"),
                partialsDir: path_1.default.join(process.cwd(), "src", "modules", "auth", "templates", "partials"),
            },
            viewPath: path_1.default.join(process.cwd(), "src", "modules", "auth", "templates", "views"),
            extName: ".hbs",
        };
        this.transporter.use("compile", (0, nodemailer_express_handlebars_1.default)(hbsOption));
    }
    async sendMail(type, to, context) {
        const { subject, template } = email_constant_1.emailConstant[type];
        const options = { from: configs_1.configs.SMTP_FROM, to, subject, template, context };
        await this.transporter.sendMail(options);
    }
}
exports.emailService = new EmailService();
