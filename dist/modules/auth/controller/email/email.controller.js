import { emailActionService } from '../../service/email/emailAction.service.js';
class EmailConroller {
    async changeEmailRequest(req, res, next) {
        try {
            const jwtPayload = res.locals.jwtPayload;
            const { newEmail } = req.body;
            await emailActionService.changeEmailRequest(jwtPayload, newEmail);
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }
    async changeEmailConfirmation(req, res, next) {
        try {
            const tokens = res.locals.tokenId;
            await emailActionService.changeEmailConfirmation(tokens);
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }
}
export const emailController = new EmailConroller();
