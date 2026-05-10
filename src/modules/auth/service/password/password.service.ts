import bcrypt from "bcrypt";

import {
  IResetPasswordSendEmail,
  IResetPasswordSet,
} from "../../interface/password/password.interface";
import { userRepository } from "../../../user/repository/user.repository";
import { ApiError } from "../../../../common/errors/api-error";
import { tokenService } from "../auth/token.service";
import { ActionTokenTypeEnum } from "../../enums/action-token-type.enum";
import { actionTokenRepository } from "../../repository/actionToken.repository";
import { emailService } from "../email/email.service";
import { EmaiTypeEnum } from "../../enums/email-type.enum";
import { ITokenPayload } from "../../interface/token/token.interface";
import { tokenRepository } from "../../repository/token.repository";

class PasswordService {
  async hashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparedPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  public async forgotPasswordSendEmail(
    dto: IResetPasswordSendEmail
  ): Promise<void> {
    const user = await userRepository.getByEmail(dto.email);
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const token = await tokenService.generateTokenAction(
      {
        id: user._id!.toString(),
        role: user.role,
      },
      ActionTokenTypeEnum.FORGOT_PASSWORD
    );
    await actionTokenRepository.create({
      token,
      type: ActionTokenTypeEnum.FORGOT_PASSWORD,
      _userId: user._id!.toString(),
    });

    await emailService.sendMail(EmaiTypeEnum.FORGOT_PASSWORD, user.email, {
      name: user.name,
      email: user.email,
      actionToken: token,
    });
  }

  public async forgotPasswordReset(
    dto: IResetPasswordSet,
    jwtPayload: ITokenPayload
  ): Promise<void> {
    const password = await this.hashedPassword(dto.password);
    await userRepository.updateById(jwtPayload.id, { password });

    await actionTokenRepository.deleteManyByParams({
      _userId: jwtPayload.id,
      type: ActionTokenTypeEnum.FORGOT_PASSWORD,
    });
    await tokenRepository.deleteOneByParams({ userId: jwtPayload.id });
  }
}

export const passwordService = new PasswordService();
