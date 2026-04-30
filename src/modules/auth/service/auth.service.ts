import { ApiError } from "../../../common/errors/api-error";
import { IUser, SignInType } from "../../user/interface/user.interface";
import { userRepository } from "../../user/repository/user.repository";
import { ITokenPair, ITokenPayload } from "../interface/token.interface";
import { tokenRepository } from "../repository/token.repository";
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

    const { refreshToken, accessToken } = await tokenService.generateTokenPair({
      userId: user._id!.toString(),
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
    refreshToken: string
  ): Promise<void> {
    const token = await tokenRepository.findByParams({ refreshToken });
    if (!token) {
      throw new ApiError("Token not found", 404);
    }

    await tokenRepository.deleteOneByParams({ _id: token._id });
  }

  public async refreshTokens(
    refreshToken: string,
    payload: ITokenPayload
  ): Promise<ITokenPair> {
    await tokenRepository.deleteOneByParams({ refreshToken });
    const tokens = tokenService.generateTokenPair({
      userId: payload.userId,
      role: payload.role,
    });

    await tokenRepository.create({ ...tokens, userId: payload.userId });

    return tokens;
  }

  private async isEmailExistOrThrow(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("Email is already exist", 409);
    }
  }
}

export const authService = new AuthService();
