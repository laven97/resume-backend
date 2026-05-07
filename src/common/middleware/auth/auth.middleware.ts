import { NextFunction, Request, Response } from "express";

import { ApiError } from "../../errors/api-error";

import { TokenTypeEnum } from "../../../modules/auth/enums/token-type.enum";
import { ITokenPayload } from "../../../modules/auth/interface/token.interface";
import { tokenService } from "../../../modules/auth/service/auth/token.service";

interface RequestWithUser extends Request {
  user?: ITokenPayload;
}

class AuthMiddleware {
  public async checkAccessToken(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const header = req.headers.authorization;
      if (!header) {
        throw new ApiError("Token is not provided", 401);
      }

      if (!header.startsWith("Bearer ")) {
        throw new ApiError("Invalid token format", 401);
      }
      const accessToken = header.split(" ")[1];
      if (!accessToken) {
        throw new ApiError("Token is empty", 401);
      }

      const payload = await tokenService.verifyToken(
        accessToken,
        TokenTypeEnum.ACCESS
      );

      req.user = payload;
      next();
    } catch (err) {
      next(err);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
