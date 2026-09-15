import jwt from "jsonwebtoken";
import { configs } from "../../../../configs/configs.js";
import { TokenTypeEnum } from "../../enums/token-type.enum.js";
import { ActionTokenTypeEnum } from "../../enums/action-token-type.enum.js";
import { ApiError } from "../../../../common/errors/api-error.js";
import { tokenRepository } from "../../repository/token/token.repository.js";
class TokenService {
    generateAccessToken(payload) {
        return jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
            expiresIn: configs.JWT_ACCESS_EXPIRATION,
        });
    }
    generateRefreshToken(payload) {
        return jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
            expiresIn: configs.JWT_REFRESH_EXPIRATION,
        });
    }
    generateTokenPair(payload) {
        return {
            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload),
        };
    }
    async verifyToken(token, type) {
        try {
            let secret;
            switch (type) {
                case TokenTypeEnum.ACCESS:
                    secret = configs.JWT_ACCESS_SECRET;
                    break;
                case TokenTypeEnum.REFRESH:
                    secret = configs.JWT_REFRESH_SECRET;
                    break;
                case ActionTokenTypeEnum.FORGOT_PASSWORD:
                    secret = configs.ACTION_FORGOT_PASSWORD_SECRET;
                    break;
                case ActionTokenTypeEnum.VERIFY_EMAIL:
                    secret = configs.ACTION_VERIFY_EMAIL_SECRET;
                    break;
                default:
                    throw new ApiError("Invalid token type", 400);
            }
            return jwt.verify(token, secret);
        }
        catch (e) {
            throw new ApiError("Invalid token type", 401);
        }
    }
    async generateTokenAction(payload, tokenType) {
        let secret;
        let expiresIn;
        switch (tokenType) {
            case ActionTokenTypeEnum.FORGOT_PASSWORD:
                secret = configs.ACTION_FORGOT_PASSWORD_SECRET;
                expiresIn = configs.ACTION_FORGOT_PASSWORD_EXPIRESIN;
                break;
            case ActionTokenTypeEnum.VERIFY_EMAIL:
                secret = configs.ACTION_VERIFY_EMAIL_SECRET;
                expiresIn = configs.ACTION_VERIFY_EMAIL_EXPIRESIN;
                break;
            default:
                throw new ApiError("Invalid token type", 400);
        }
        return jwt.sign(payload, secret, { expiresIn });
    }
    async refreshTokens(refreshToken, payload) {
        await tokenRepository.deleteOneByParams({ refreshToken });
        const tokens = tokenService.generateTokenPair({
            id: payload.id,
            role: payload.role,
        });
        await tokenRepository.create({ ...tokens, userId: payload.id });
        return tokens;
    }
}
export const tokenService = new TokenService();
