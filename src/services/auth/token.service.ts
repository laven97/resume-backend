import jwt from "jsonwebtoken";

import {
  ITokenPair,
  ITokenPayload,
} from "../../interfaces/auth/token.interface";
import { configs } from "../../configs/configs";

class TokenService {
  public async generateTokenPair(payload: ITokenPayload): Promise<ITokenPair> {
    const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
      expiresIn: configs.JWT_ACCESS_EXPIRATION,
    });
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
      expiresIn: configs.JWT_REFRESH_EXPIRATION,
    });
    return { accessToken, refreshToken };
  }

  // public async generateTokenAction(
  //   payload: ITokenPayload,
  //   tokenType: ActionTokenTypeEnum
  // ): Promise<string> {
  //   let secret: string;
  //   let expiresIn: string;

  //   switch (tokenType) {
  //     case ActionTokenTypeEnum.FORGOT_PASSWORD:
  //       secret = configs.ACTION_FORGOT_PASSWORD_SECRET;
  //       expiresIn = configs.ACTION_FORGOT_PASSWORD_EXPIRESIN;
  //       break;

  //     case ActionTokenTypeEnum.VERIFY_EMAIL:
  //       ((secret = configs.ACTION_VERIFY_EMAIL_SECRET),
  //         (expiresIn = configs.ACTION_VERIFY_EMAIL_EXPIRESIN));
  //       break;
  //     default:
  //       throw new ApiError("Invalid token type", 400);
  //   }
  //   return jwt.sign(payload, secret, { expiresIn });
  // }
}

export const tokenService = new TokenService();
