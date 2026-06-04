import jwt, { SignOptions } from "jsonwebtoken";

import { configs } from "../../../../configs/configs";
import { TokenTypeEnum } from "../../enums/token-type.enum";
import { ActionTokenTypeEnum } from "../../enums/action-token-type.enum";
import { ApiError } from "../../../../common/errors/api-error";

import {
  ITokenPair,
  ITokenPayload,
} from "../../interface/token/token.interface";
import { tokenRepository } from "../../repository/token/token.repository";

class TokenService {
  public generateAccessToken(payload: ITokenPayload): string {
    return jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: configs.JWT_ACCESS_EXPIRATION,
    });
  }

  public generateRefreshToken(payload: ITokenPayload): string {
    return jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
      expiresIn: configs.JWT_REFRESH_EXPIRATION,
    });
  }

  public generateTokenPair(payload: ITokenPayload): ITokenPair {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  public async verifyToken(
    token: string,
    type: TokenTypeEnum | ActionTokenTypeEnum
  ): Promise<ITokenPayload> {
    try {
      let secret: string;

      switch (type) {
        case TokenTypeEnum.ACCESS:
          secret = configs.JWT_ACCESS_SECRET;
          break;

        case TokenTypeEnum.REFRESH:
          secret = configs.JWT_REFRESH_SECRET;
          break;

        case ActionTokenTypeEnum.FORGOT_PASSWORD:
          secret = configs.ACTION_FORGOT_PASSWORD_SECRET;
          break;

        case ActionTokenTypeEnum.VERIFY_EMAIL:
          secret = configs.ACTION_VERIFY_EMAIL_SECRET;
          break;

        default:
          throw new ApiError("Invalid token type", 400);
      }

      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Invalid token type", 401);
    }
  }

  public async generateTokenAction(
    payload: ITokenPayload,
    tokenType: ActionTokenTypeEnum
  ): Promise<string> {
    let secret: string;
    let expiresIn: SignOptions["expiresIn"];

    switch (tokenType) {
      case ActionTokenTypeEnum.FORGOT_PASSWORD:
        secret = configs.ACTION_FORGOT_PASSWORD_SECRET;
        expiresIn = configs.ACTION_FORGOT_PASSWORD_EXPIRESIN;
        break;

      case ActionTokenTypeEnum.VERIFY_EMAIL:
        secret = configs.ACTION_VERIFY_EMAIL_SECRET;
        expiresIn = configs.ACTION_VERIFY_EMAIL_EXPIRESIN;
        break;
      default:
        throw new ApiError("Invalid token type", 400);
    }
    return jwt.sign(payload, secret, { expiresIn });
  }

  public async refreshTokens(
    refreshToken: string,
    payload: ITokenPayload
  ): Promise<ITokenPair> {
    await tokenRepository.deleteOneByParams({ refreshToken });
    const tokens = tokenService.generateTokenPair({
      id: payload.id,
      role: payload.role,
    });

    await tokenRepository.create({ ...tokens, userId: payload.id });

    return tokens;
  }
}

export const tokenService = new TokenService();
