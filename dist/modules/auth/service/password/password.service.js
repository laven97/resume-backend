import bcrypt from "bcrypt";
import { ApiError } from "../../../../common/errors/api-error.js";
import { ActionTokenTypeEnum } from "../../enums/action-token-type.enum.js";
import { emailService } from "../email/email.service.js";
import { EmaiTypeEnum } from "../../enums/email-type.enum.js";
import { actionTokenRepository } from "../../repository/token/actionToken.repository.js";
import { tokenRepository } from "../../repository/token/token.repository.js";
import { oldTokenRepository } from "../../repository/password/old-password.repository.js";
import { tokenService } from "../token/token.service.js";
import { userRepository } from "../../../user/repository/user/user.repository.js";
class PasswordService {
    async hashedPassword(password) {
        return await bcrypt.hash(password, 10);
    }
    async comparedPassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
    async forgotPasswordSendEmail(dto) {
        const user = await userRepository.getByEmail(dto.email);
        if (!user) {
            throw new ApiError("User not found", 404);
        }
        const token = await tokenService.generateTokenAction({
            id: user._id.toString(),
            role: user.role,
        }, ActionTokenTypeEnum.FORGOT_PASSWORD);
        await actionTokenRepository.create({
            token,
            type: ActionTokenTypeEnum.FORGOT_PASSWORD,
            _userId: user._id.toString(),
        });
        await emailService.sendMail(EmaiTypeEnum.FORGOT_PASSWORD, user.email, {
            name: user.name,
            email: user.email,
            actionToken: token,
        });
    }
    async forgotPasswordReset(dto, jwtPayload) {
        const password = await this.hashedPassword(dto.password);
        await userRepository.updateById(jwtPayload.id, { password });
        await actionTokenRepository.deleteManyByParams({
            _userId: jwtPayload.id,
            type: ActionTokenTypeEnum.FORGOT_PASSWORD,
        });
        await tokenRepository.deleteOneByParams({ userId: jwtPayload.id });
    }
    async changePassword(jwtPayload, dto) {
        const [user, oldPasswords] = await Promise.all([
            userRepository.getById(jwtPayload.id),
            oldTokenRepository.findByParams(jwtPayload.id),
        ]);
        if (!user) {
            throw new ApiError("User not found", 404);
        }
        const isPasswordCorrect = await this.comparedPassword(dto.oldPassword, user.password);
        if (!isPasswordCorrect) {
            throw new ApiError("Invalid credentials", 401);
        }
        const passwords = [...oldPasswords, { password: user.password }];
        await Promise.all(passwords.map(async (oldPasswords) => {
            const isPreviousPassword = await this.comparedPassword(dto.password, oldPasswords.password);
            if (isPreviousPassword) {
                throw new ApiError("You cannot use one of your previous passwords", 400);
            }
        }));
        const password = await this.hashedPassword(dto.password);
        await userRepository.updateById(jwtPayload.id, { password });
        await oldTokenRepository.create({
            _userId: jwtPayload.id,
            password: user.password,
        });
        await tokenRepository.deleteOneByParams({ userId: jwtPayload.id });
    }
    async verify(jwtPayload) {
        await userRepository.updateById(jwtPayload.id, { isVerified: true });
        await actionTokenRepository.deleteManyByParams({
            _userId: jwtPayload.id,
            type: ActionTokenTypeEnum.VERIFY_EMAIL,
        });
    }
}
export const passwordService = new PasswordService();
