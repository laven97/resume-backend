"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const api_error_1 = require("../../../../common/errors/api-error");
const action_token_type_enum_1 = require("../../enums/action-token-type.enum");
const email_service_1 = require("../email/email.service");
const email_type_enum_1 = require("../../enums/email-type.enum");
const actionToken_repository_1 = require("../../repository/token/actionToken.repository");
const token_repository_1 = require("../../repository/token/token.repository");
const old_password_repository_1 = require("../../repository/password/old-password.repository");
const token_service_1 = require("../token/token.service");
const user_repository_1 = require("../../../user/repository/user/user.repository");
class PasswordService {
    async hashedPassword(password) {
        return await bcrypt_1.default.hash(password, 10);
    }
    async comparedPassword(password, hashedPassword) {
        return await bcrypt_1.default.compare(password, hashedPassword);
    }
    async forgotPasswordSendEmail(dto) {
        const user = await user_repository_1.userRepository.getByEmail(dto.email);
        if (!user) {
            throw new api_error_1.ApiError("User not found", 404);
        }
        const token = await token_service_1.tokenService.generateTokenAction({
            id: user._id.toString(),
            role: user.role,
        }, action_token_type_enum_1.ActionTokenTypeEnum.FORGOT_PASSWORD);
        await actionToken_repository_1.actionTokenRepository.create({
            token,
            type: action_token_type_enum_1.ActionTokenTypeEnum.FORGOT_PASSWORD,
            _userId: user._id.toString(),
        });
        await email_service_1.emailService.sendMail(email_type_enum_1.EmaiTypeEnum.FORGOT_PASSWORD, user.email, {
            name: user.name,
            email: user.email,
            actionToken: token,
        });
    }
    async forgotPasswordReset(dto, jwtPayload) {
        const password = await this.hashedPassword(dto.password);
        await user_repository_1.userRepository.updateById(jwtPayload.id, { password });
        await actionToken_repository_1.actionTokenRepository.deleteManyByParams({
            _userId: jwtPayload.id,
            type: action_token_type_enum_1.ActionTokenTypeEnum.FORGOT_PASSWORD,
        });
        await token_repository_1.tokenRepository.deleteOneByParams({ userId: jwtPayload.id });
    }
    async changePassword(jwtPayload, dto) {
        const [user, oldPasswords] = await Promise.all([
            user_repository_1.userRepository.getById(jwtPayload.id),
            old_password_repository_1.oldTokenRepository.findByParams(jwtPayload.id),
        ]);
        if (!user) {
            throw new api_error_1.ApiError("User not found", 404);
        }
        const isPasswordCorrect = await this.comparedPassword(dto.oldPassword, user.password);
        if (!isPasswordCorrect) {
            throw new api_error_1.ApiError("Invalid credentials", 401);
        }
        const passwords = [...oldPasswords, { password: user.password }];
        await Promise.all(passwords.map(async (oldPasswords) => {
            const isPreviousPassword = await this.comparedPassword(dto.password, oldPasswords.password);
            if (isPreviousPassword) {
                throw new api_error_1.ApiError("You cannot use one of your previous passwords", 400);
            }
        }));
        const password = await this.hashedPassword(dto.password);
        await user_repository_1.userRepository.updateById(jwtPayload.id, { password });
        await old_password_repository_1.oldTokenRepository.create({
            _userId: jwtPayload.id,
            password: user.password,
        });
        await token_repository_1.tokenRepository.deleteOneByParams({ userId: jwtPayload.id });
    }
    async verify(jwtPayload) {
        await user_repository_1.userRepository.updateById(jwtPayload.id, { isVerified: true });
        await actionToken_repository_1.actionTokenRepository.deleteManyByParams({
            _userId: jwtPayload.id,
            type: action_token_type_enum_1.ActionTokenTypeEnum.VERIFY_EMAIL,
        });
    }
}
exports.passwordService = new PasswordService();
