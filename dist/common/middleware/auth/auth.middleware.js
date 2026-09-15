import { ApiError } from "../../errors/api-error.js";
import { TokenTypeEnum } from "../../../modules/auth/enums/token-type.enum.js";
import { actionTokenRepository } from "../../../modules/auth/repository/token/actionToken.repository.js";
import { tokenService } from "../../../modules/auth/service/token/token.service.js";
class AuthMiddleware {
    async checkAccessToken(req, res, next) {
        try {
            const header = req.headers.authorization;
            if (!header) {
                throw new ApiError("Token is not provided", 401);
            }
            if (!header.startsWith("Bearer ")) {
                throw new ApiError("Invalid token format", 401);
            }
            const accessToken = header.split(" ")[1];
            if (!accessToken) {
                throw new ApiError("Token is empty", 401);
            }
            const payload = await tokenService.verifyToken(accessToken, TokenTypeEnum.ACCESS);
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
                    throw new ApiError("Token is not provided", 401);
                }
                const payload = tokenService.verifyToken(token, type);
                const tokenEntity = await actionTokenRepository.getByToken(token);
                if (!tokenEntity) {
                    throw new ApiError("Token is invalid", 401);
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
export const authMiddleware = new AuthMiddleware();
