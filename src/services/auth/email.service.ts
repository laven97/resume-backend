import nodemailer, { Transporter } from "nodemailer";
import { configs } from "../../configs/configs";
import path from "path";
import hbs from "nodemailer-express-handlebars";
import { EmaiTypeEnum } from "../../enums/auth/email-type.enum";
import { EmailTypeToPayload } from "../../types/auth/email-type-to-payload";
import { emailConstant } from "../../constants/auth/email.constant";

class EmailService {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: configs.SMTP_HOST,
      from: configs.SMTP_FROM,
      auth: {
        user: configs.SMTP_USER,
        pass: configs.SMPT_PASSWORD,
      },
    });

    const hbsOption = {
      viewEngine: {
        extname: ".hbs",
        defaultlayout: "main",
        layoutDir: path.join(process.cwd(), "src", "tempates", "latouts"),
        partialDir: path.join(process.cwd(), "src", "tempates", "partials"),
      },
      viewPath: path.join(process.cwd(), "src", "templates", "views"),
      extName: ".hbs",
    };
    this.transporter.use("compile", hbs(hbsOption));
  }

  public async sendMail<T extends EmaiTypeEnum>(
    type: T,
    to: string,
    context: EmailTypeToPayload[T]
  ): Promise<void> {
    const { subject, template } = emailConstant[type];

    context["front-url"] = configs.APP_FRON_URL;
    const options = { to, subject, template, context };
    await this.transporter.sendMail(options);
  }
}

export const emailService = new EmailService();
