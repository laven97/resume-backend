import { NextFunction, Request, Response } from "express";

import { ApiError } from "../../errors/api-error";
import { tokenService } from "../../../modules/auth/service/token.service";
import { TokenTypeEnum } from "../../../modules/auth/enums/token-type.enum";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
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

      res.locals.jwtPayload = payload;
      next();
    } catch (err) {
      next(err);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
