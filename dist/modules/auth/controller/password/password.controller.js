import { passwordService } from "../../service/password/password.service.js";
class PasswordContoller {
    async forgotPasswordSendEmail(req, res, next) {
        try {
            const dto = req.body;
            await passwordService.forgotPasswordSendEmail(dto);
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
            await passwordService.forgotPasswordReset(dto, jwtPayload);
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
            await passwordService.changePassword(jwtPayload, dto);
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }
    async verify(req, res, next) {
        try {
            const jwtPayload = res.locals.jwtPayload;
            await passwordService.verify(jwtPayload);
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }
}
export const passwordController = new PasswordContoller();
