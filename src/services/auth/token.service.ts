import  jwt from "jsonwebtoken";

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
    const refreshToken = jwt.sign(
      payload,
      configs.JWT_REFRESH_SECRET,
      { expiresIn: configs.JWT_REFRESH_EXPIRATION }
    );
    return { accessToken, refreshToken };
  }
}

export const tokenService = new TokenService();
