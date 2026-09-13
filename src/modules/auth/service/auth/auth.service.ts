import { ApiError } from '../../../../common/errors/api-error';
import { IUser, SignInType } from '../../../user/interface/user/user.interface';
import { userRepository } from '../../../user/repository/user/user.repository';

import { ActionTokenTypeEnum } from '../../enums/action-token-type.enum';
import { EmaiTypeEnum } from '../../enums/email-type.enum';
import {
  ITokenPair,
  ITokenPayload,
} from '../../interface/token/token.interface';
import { actionTokenRepository } from '../../repository/token/actionToken.repository';
import { tokenRepository } from '../../repository/token/token.repository';

import { emailService } from '../email/email.service';
import { passwordService } from '../password/password.service';
import { tokenService } from '../token/token.service';

class AuthService {
  public async signUp(
    dto: IUser,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    await this.isEmailExistOrThrow(dto.email);
    const password = await passwordService.hashedPassword(dto.password);
    const user = await userRepository.createUser({ ...dto, password });

    const tokens = await tokenService.generateTokenPair({
      id: user._id!.toString(),
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, userId: user._id!.toString() });

    const token = await tokenService.generateTokenAction(
      {
        id: user._id!.toString(),
        role: user.role,
      },
      ActionTokenTypeEnum.VERIFY_EMAIL,
    );
    await actionTokenRepository.create({
      token,
      type: ActionTokenTypeEnum.VERIFY_EMAIL,
      _userId: user._id!.toString(),
    });

    await emailService.sendMail(EmaiTypeEnum.WELCOME, user.email, {
      name: user.name,
      actionToken: token,
    });
    console.log('EMAIL SENT');

    return { user, tokens };
  }

  public async signIn(
    dto: SignInType,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const user = await userRepository.getByEmail(dto.email);
    if (!user) {
      throw new ApiError('User not found', 404);
    }

    const isPasswordCorrect = await passwordService.comparedPassword(
      dto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new ApiError('Invalid credentials', 401);
    }

    const { refreshToken, accessToken } = await tokenService.generateTokenPair({
      id: user._id!.toString(),
      role: user.role,
    });
    await tokenRepository.create({
      refreshToken,
      userId: user._id!.toString(),
    });

    return { user, tokens: { accessToken, refreshToken } };
  }

  public async logout(
    jwtPayload: ITokenPayload,
    tokenId: string,
  ): Promise<void> {
    const user = await userRepository.getById(jwtPayload.id);
    if (!user) {
      throw new ApiError('User not found', 404);
    }
    await tokenRepository.deleteOneByParams({ _id: tokenId });
    await emailService.sendMail(EmaiTypeEnum.LOGOUT, user.email, {
      name: user.name,
    });
  }

  private async isEmailExistOrThrow(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError('Email is already exist', 409);
    }
  }
}

export const authService = new AuthService();
