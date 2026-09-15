"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailActionService = void 0;
const api_error_1 = require("../../../../common/errors/api-error");
const user_repository_1 = require("../../../user/repository/user/user.repository");
const action_token_type_enum_1 = require("../../enums/action-token-type.enum");
const email_type_enum_1 = require("../../enums/email-type.enum");
const actionToken_repository_1 = require("../../repository/token/actionToken.repository");
const token_service_1 = require("../token/token.service");
const email_service_1 = require("./email.service");
class EmailActionService {
    async isEmailExistOrThrow(email, excludeUserId) {
        const user = await user_repository_1.userRepository.findOne({
            email,
            _id: excludeUserId ? { $ne: excludeUserId } : undefined,
        });
        if (user) {
            throw new api_error_1.ApiError('Email is already exist', 409);
        }
    }
    async changeEmailRequest(jwtPayload, newEmail) {
        const user = await user_repository_1.userRepository.getById(jwtPayload.id);
        if (!user) {
            throw new api_error_1.ApiError('User not found', 404);
        }
        await this.isEmailExistOrThrow(newEmail, jwtPayload.id);
        const token = await token_service_1.tokenService.generateTokenAction({
            id: user._id.toString(),
            role: user.role,
        }, action_token_type_enum_1.ActionTokenTypeEnum.CHANGE_EMAIL);
        await actionToken_repository_1.actionTokenRepository.create({
            _userId: user._id.toString(),
            type: action_token_type_enum_1.ActionTokenTypeEnum.CHANGE_EMAIL,
            token,
            metadata: { newEmail },
        });
        await email_service_1.emailService.sendMail(email_type_enum_1.EmaiTypeEnum.CHANGE_EMAIL, user.email, {
            name: user.name,
            email: newEmail,
            actionToken: token,
        });
    }
    async changeEmailConfirmation(token) {
        const tokenEntity = await actionToken_repository_1.actionTokenRepository.getByToken(token.token);
        if (!tokenEntity) {
            throw new api_error_1.ApiError('Token is invalid', 400);
        }
        const newEmail = tokenEntity.metadata?.newEmail;
        if (!newEmail) {
            throw new api_error_1.ApiError('New email not found', 400);
        }
        const user = await user_repository_1.userRepository.getById(tokenEntity._userId);
        if (!user) {
            throw new api_error_1.ApiError('User not found', 404);
        }
        await this.isEmailExistOrThrow(newEmail, user._id.toString());
        await user_repository_1.userRepository.updateById(user._id.toString(), { email: newEmail });
        await actionToken_repository_1.actionTokenRepository.deleteManyByParams({
            _userId: user._id.toString(),
            type: action_token_type_enum_1.ActionTokenTypeEnum.CHANGE_EMAIL,
        });
        await email_service_1.emailService.sendMail(email_type_enum_1.EmaiTypeEnum.CHANGE_EMAIL, user.email, {
            name: user.name,
            email: newEmail,
            actionToken: token.token,
        });
    }
}
exports.emailActionService = new EmailActionService();
