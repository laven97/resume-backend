"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const api_error_1 = require("../../errors/api-error");
const token_type_enum_1 = require("../../../modules/auth/enums/token-type.enum");
const actionToken_repository_1 = require("../../../modules/auth/repository/token/actionToken.repository");
const token_service_1 = require("../../../modules/auth/service/token/token.service");
class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const header = req.headers.authorization;
            if (!header) {
                throw new api_error_1.ApiError("Token is not provided", 401);
            }
            if (!header.startsWith("Bearer ")) {
                throw new api_error_1.ApiError("Invalid token format", 401);
            }
            const accessToken = header.split(" ")[1];
            if (!accessToken) {
                throw new api_error_1.ApiError("Token is empty", 401);
            }
            const payload = await token_service_1.tokenService.verifyToken(accessToken, token_type_enum_1.TokenTypeEnum.ACCESS);
            req.user = payload;
            next();
        }
        catch (err) {
            next(err);
        }
    }
    checkActionToken(type) {
        return async (req, res, next) => {
            try {
                const token = req.body.token;
                if (!token) {
                    throw new api_error_1.ApiError("Token is not provided", 401);
                }
                const payload = token_service_1.tokenService.verifyToken(token, type);
                const tokenEntity = await actionToken_repository_1.actionTokenRepository.getByToken(token);
                if (!tokenEntity) {
                    throw new api_error_1.ApiError("Token is invalid", 401);
                }
                res.locals.jwtPayload = payload;
                next();
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.authMiddleware = new AuthMiddleware();
