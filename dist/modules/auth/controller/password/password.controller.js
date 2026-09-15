"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordController = void 0;
const password_service_1 = require("../../service/password/password.service");
class PasswordContoller {
    async forgotPasswordSendEmail(req, res, next) {
        try {
            const dto = req.body;
            await password_service_1.passwordService.forgotPasswordSendEmail(dto);
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }
    async forgotPasswordReset(req, res, next) {
        try {
            const jwtPayload = res.locals.jwtPayload;
            const dto = req.body;
            await password_service_1.passwordService.forgotPasswordReset(dto, jwtPayload);
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }
    async changePassword(req, res, next) {
        try {
            const jwtPayload = res.locals.jwtPayload;
            const dto = req.body;
            await password_service_1.passwordService.changePassword(jwtPayload, dto);
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }
    async verify(req, res, next) {
        try {
            const jwtPayload = res.locals.jwtPayload;
            await password_service_1.passwordService.verify(jwtPayload);
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.passwordController = new PasswordContoller();
