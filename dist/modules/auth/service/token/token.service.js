"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = require("../../../../configs/configs");
const token_type_enum_1 = require("../../enums/token-type.enum");
const action_token_type_enum_1 = require("../../enums/action-token-type.enum");
const api_error_1 = require("../../../../common/errors/api-error");
const token_repository_1 = require("../../repository/token/token.repository");
class TokenService {
    generateAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, configs_1.configs.JWT_ACCESS_SECRET, {
            expiresIn: configs_1.configs.JWT_ACCESS_EXPIRATION,
        });
    }
    generateRefreshToken(payload) {
        return jsonwebtoken_1.default.sign(payload, configs_1.configs.JWT_REFRESH_SECRET, {
            expiresIn: configs_1.configs.JWT_REFRESH_EXPIRATION,
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
                case token_type_enum_1.TokenTypeEnum.ACCESS:
                    secret = configs_1.configs.JWT_ACCESS_SECRET;
                    break;
                case token_type_enum_1.TokenTypeEnum.REFRESH:
                    secret = configs_1.configs.JWT_REFRESH_SECRET;
                    break;
                case action_token_type_enum_1.ActionTokenTypeEnum.FORGOT_PASSWORD:
                    secret = configs_1.configs.ACTION_FORGOT_PASSWORD_SECRET;
                    break;
                case action_token_type_enum_1.ActionTokenTypeEnum.VERIFY_EMAIL:
                    secret = configs_1.configs.ACTION_VERIFY_EMAIL_SECRET;
                    break;
                default:
                    throw new api_error_1.ApiError("Invalid token type", 400);
            }
            return jsonwebtoken_1.default.verify(token, secret);
        }
        catch (e) {
            throw new api_error_1.ApiError("Invalid token type", 401);
        }
    }
    async generateTokenAction(payload, tokenType) {
        let secret;
        let expiresIn;
        switch (tokenType) {
            case action_token_type_enum_1.ActionTokenTypeEnum.FORGOT_PASSWORD:
                secret = configs_1.configs.ACTION_FORGOT_PASSWORD_SECRET;
                expiresIn = configs_1.configs.ACTION_FORGOT_PASSWORD_EXPIRESIN;
                break;
            case action_token_type_enum_1.ActionTokenTypeEnum.VERIFY_EMAIL:
                secret = configs_1.configs.ACTION_VERIFY_EMAIL_SECRET;
                expiresIn = configs_1.configs.ACTION_VERIFY_EMAIL_EXPIRESIN;
                break;
            default:
                throw new api_error_1.ApiError("Invalid token type", 400);
        }
        return jsonwebtoken_1.default.sign(payload, secret, { expiresIn });
    }
    async refreshTokens(refreshToken, payload) {
        await token_repository_1.tokenRepository.deleteOneByParams({ refreshToken });
        const tokens = exports.tokenService.generateTokenPair({
            id: payload.id,
            role: payload.role,
        });
        await token_repository_1.tokenRepository.create({ ...tokens, userId: payload.id });
        return tokens;
    }
}
exports.tokenService = new TokenService();
