import { authService } from "../../service/auth/auth.service.js";
import { tokenService } from "../../service/token/token.service.js";
class AuthController {
    async signUp(req, res, next) {
        try {
            const dto = req.body;
            const result = await authService.signUp(dto);
            res.status(201).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async signIn(req, res, next) {
        try {
            const dto = req.body;
            const result = await authService.signIn(dto);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async logout(req, res, next) {
        try {
            const tokenId = res.locals.tokenId;
            const jwtPayload = res.locals.jwtPayload;
            await authService.logout(jwtPayload, tokenId);
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }
    async refreshTokens(req, res, next) {
        try {
            const tokens = res.locals.tokenId;
            const jwtPayload = res.locals.jwtPayload;
            const result = await tokenService.refreshTokens(tokens, jwtPayload);
            res.status(201).json(result);
        }
        catch (err) {
            next(err);
        }
    }
}
export const authController = new AuthController();
