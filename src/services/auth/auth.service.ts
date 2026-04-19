import { ApiError } from "../../errors/api-error";
import {
  ITokenPair,
  ITokenPayload,
} from "../../interfaces/auth/token.interface";
import { IUser, SignInType } from "../../interfaces/user/user.interface";
import { tokenRepository } from "../../repositories/auth/token.repository";
import { userRepository } from "../../repositories/user/user.repository";

import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUp(
    dto: IUser
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    await this.isEmailExistOrThrow(dto.email);
    const password = await passwordService.hashedPassword(dto.password);
    const user = await userRepository.createUser({ ...dto, password });

    const tokens = await tokenService.generateTokenPair({
      userId: user._id!.toString(),
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, userId: user._id!.toString() });

    

    // await emailService.sendMail(EmaiTypeEnum.WElCOME,user.email, {name:user.name})

    return { user, tokens };
  }

  public async signIn(
    dto: SignInType
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const user = await userRepository.getByEmail(dto.email);
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const isPasswordCorrect = await passwordService.comparedPassword(
      dto.password,
      user.password
    );
    if (!isPasswordCorrect) {
      throw new ApiError("Invalid credentials", 401);
    }

    const tokens = await tokenService.generateTokenPair({
      userId: user._id!.toString(),
      role: user.role,
    });
    await tokenRepository.create({
      ...tokens,
      userId: user._id!.toString(),
    });
    return { user, tokens };
  }

  public async logout(
    jwtPayload: ITokenPayload,
    tokenId: string
  ): Promise<void> {
    // const user = await userRepository.getById(jwtPayload.userId)
    await tokenRepository.deleteOnByParams({ _id: tokenId });
  }

  private async isEmailExistOrThrow(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("Email is already exist", 409);
    }
  }
}

export const authService = new AuthService();
