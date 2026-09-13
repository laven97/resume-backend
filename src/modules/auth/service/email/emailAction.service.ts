import { ApiError } from '../../../../common/errors/api-error';
import { userRepository } from '../../../user/repository/user/user.repository';

import { ActionTokenTypeEnum } from '../../enums/action-token-type.enum';
import { EmaiTypeEnum } from '../../enums/email-type.enum';
import { IActionToken } from '../../interface/token/actionTokne.interface';
import { ITokenPayload } from '../../interface/token/token.interface';
import { actionTokenRepository } from '../../repository/token/actionToken.repository';
import { tokenService } from '../token/token.service';
import { emailService } from './email.service';

class EmailActionService {
  private async isEmailExistOrThrow(
    email: string,
    excludeUserId?: string,
  ): Promise<void> {
    const user = await userRepository.findOne({
      email,
      _id: excludeUserId ? { $ne: excludeUserId } : undefined,
    });
    if (user) {
      throw new ApiError('Email is already exist', 409);
    }
  }

  public async changeEmailRequest(
    jwtPayload: ITokenPayload,
    newEmail: string,
  ): Promise<void> {
    const user = await userRepository.getById(jwtPayload.id);
    if (!user) {
      throw new ApiError('User not found', 404);
    }
    await this.isEmailExistOrThrow(newEmail, jwtPayload.id);

    const token = await tokenService.generateTokenAction(
      {
        id: user._id!.toString(),
        role: user.role,
      },
      ActionTokenTypeEnum.CHANGE_EMAIL,
    );
    await actionTokenRepository.create({
      _userId: user._id!.toString(),
      type: ActionTokenTypeEnum.CHANGE_EMAIL,
      token,
      metadata: { newEmail },
    });

    await emailService.sendMail(EmaiTypeEnum.CHANGE_EMAIL, user.email, {
      name: user.name,
      email: newEmail,
      actionToken: token,
    });
  }

  public async changeEmailConfirmation(token: IActionToken): Promise<void> {
    const tokenEntity = await actionTokenRepository.getByToken(token.token);
    if (!tokenEntity) {
      throw new ApiError('Token is invalid', 400);
    }

    const newEmail = tokenEntity.metadata?.newEmail;
    if (!newEmail) {
      throw new ApiError('New email not found', 400);
    }

    const user = await userRepository.getById(tokenEntity._userId);
    if (!user) {
      throw new ApiError('User not found', 404);
    }

    await this.isEmailExistOrThrow(newEmail, user._id!.toString());
    await userRepository.updateById(user._id!.toString(), { email: newEmail });

    await actionTokenRepository.deleteManyByParams({
      _userId: user._id!.toString(),
      type: ActionTokenTypeEnum.CHANGE_EMAIL,
    });

    await emailService.sendMail(EmaiTypeEnum.CHANGE_EMAIL, user.email, {
      name: user.name,
      email: newEmail,
      actionToken: token.token,
    });
  }
}

export const emailActionService = new EmailActionService();
