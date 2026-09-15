import nodemailer from 'nodemailer';
import path from 'path';
import hbs from 'nodemailer-express-handlebars';
import { configs } from '../../../../configs/configs.js';
import { emailConstant } from '../../constant/email.constant.js';
class EmailService {
    transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: configs.SMTP_HOST,
            port: Number(configs.SMTP_PORT),
            auth: {
                user: configs.SMTP_USER,
                pass: configs.SMTP_PASSWORD,
            },
        });
        const hbsOption = {
            viewEngine: {
                extname: '.hbs',
                defaultLayout: 'main',
                layoutsDir: path.join(process.cwd(), 'src', 'modules', 'auth', 'templates', 'layouts'),
                partialsDir: path.join(process.cwd(), 'src', 'modules', 'auth', 'templates', 'partials'),
            },
            viewPath: path.join(process.cwd(), 'src', 'modules', 'auth', 'templates', 'views'),
            extName: '.hbs',
        };
        this.transporter.use('compile', hbs(hbsOption));
    }
    async sendMail(type, to, context) {
        const { subject, template } = emailConstant[type];
        const options = { from: configs.SMTP_FROM, to, subject, template, context };
        await this.transporter.sendMail(options);
    }
}
export const emailService = new EmailService();
