"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const api_error_1 = require("../../../../common/errors/api-error");
const user_repository_1 = require("../../../user/repository/user/user.repository");
const action_token_type_enum_1 = require("../../enums/action-token-type.enum");
const email_type_enum_1 = require("../../enums/email-type.enum");
const actionToken_repository_1 = require("../../repository/token/actionToken.repository");
const token_repository_1 = require("../../repository/token/token.repository");
const email_service_1 = require("../email/email.service");
const password_service_1 = require("../password/password.service");
const token_service_1 = require("../token/token.service");
class AuthService {
    async signUp(dto) {
        await this.isEmailExistOrThrow(dto.email);
        const password = await password_service_1.passwordService.hashedPassword(dto.password);
        const user = await user_repository_1.userRepository.createUser({ ...dto, password });
        const tokens = await token_service_1.tokenService.generateTokenPair({
            id: user._id.toString(),
            role: user.role,
        });
        await token_repository_1.tokenRepository.create({ ...tokens, userId: user._id.toString() });
        const token = await token_service_1.tokenService.generateTokenAction({
            id: user._id.toString(),
            role: user.role,
        }, action_token_type_enum_1.ActionTokenTypeEnum.VERIFY_EMAIL);
        await actionToken_repository_1.actionTokenRepository.create({
            token,
            type: action_token_type_enum_1.ActionTokenTypeEnum.VERIFY_EMAIL,
            _userId: user._id.toString(),
        });
        await email_service_1.emailService.sendMail(email_type_enum_1.EmaiTypeEnum.WELCOME, user.email, {
            name: user.name,
            actionToken: token,
        });
        console.log('EMAIL SENT');
        return { user, tokens };
    }
    async signIn(dto) {
        const user = await user_repository_1.userRepository.getByEmail(dto.email);
        if (!user) {
            throw new api_error_1.ApiError('User not found', 404);
        }
        const isPasswordCorrect = await password_service_1.passwordService.comparedPassword(dto.password, user.password);
        if (!isPasswordCorrect) {
            throw new api_error_1.ApiError('Invalid credentials', 401);
        }
        const { refreshToken, accessToken } = await token_service_1.tokenService.generateTokenPair({
            id: user._id.toString(),
            role: user.role,
        });
        await token_repository_1.tokenRepository.create({
            refreshToken,
            userId: user._id.toString(),
        });
        return { user, tokens: { accessToken, refreshToken } };
    }
    async logout(jwtPayload, tokenId) {
        const user = await user_repository_1.userRepository.getById(jwtPayload.id);
        if (!user) {
            throw new api_error_1.ApiError('User not found', 404);
        }
        await token_repository_1.tokenRepository.deleteOneByParams({ _id: tokenId });
        await email_service_1.emailService.sendMail(email_type_enum_1.EmaiTypeEnum.LOGOUT, user.email, {
            name: user.name,
        });
    }
    async isEmailExistOrThrow(email) {
        const user = await user_repository_1.userRepository.getByEmail(email);
        if (user) {
            throw new api_error_1.ApiError('Email is already exist', 409);
        }
    }
}
exports.authService = new AuthService();
