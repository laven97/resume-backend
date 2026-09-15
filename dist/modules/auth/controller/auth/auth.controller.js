"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("../../service/auth/auth.service");
const token_service_1 = require("../../service/token/token.service");
class AuthController {
    async signUp(req, res, next) {
        try {
            const dto = req.body;
            const result = await auth_service_1.authService.signUp(dto);
            res.status(201).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async signIn(req, res, next) {
        try {
            const dto = req.body;
            const result = await auth_service_1.authService.signIn(dto);
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
            await auth_service_1.authService.logout(jwtPayload, tokenId);
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
            const result = await token_service_1.tokenService.refreshTokens(tokens, jwtPayload);
            res.status(201).json(result);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.authController = new AuthController();
