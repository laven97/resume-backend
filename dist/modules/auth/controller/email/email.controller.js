"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailController = void 0;
const emailAction_service_1 = require("../../service/email/emailAction.service");
class EmailConroller {
    async changeEmailRequest(req, res, next) {
        try {
            const jwtPayload = res.locals.jwtPayload;
            const { newEmail } = req.body;
            await emailAction_service_1.emailActionService.changeEmailRequest(jwtPayload, newEmail);
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }
    async changeEmailConfirmation(req, res, next) {
        try {
            const tokens = res.locals.tokenId;
            await emailAction_service_1.emailActionService.changeEmailConfirmation(tokens);
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.emailController = new EmailConroller();
