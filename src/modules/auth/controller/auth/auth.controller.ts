import { Response, Request, NextFunction } from "express";

import { IUser, SignInType } from "../../../user/interface/user.interface";
import { authService } from "../../service/auth/auth.service";
import { ITokenPayload } from "../../interface/token/token.interface";
import { tokenService } from "../../service/token/token.service";


class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUser;
      const result = await authService.signUp(dto);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as SignInType;
      const result = await authService.signIn(dto);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenId = res.locals.tokenId as string;
      const jwtPayload = res.locals.jwtPayload as ITokenPayload;

      await authService.logout(jwtPayload, tokenId);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  public async refreshTokens(req: Request, res: Response, next: NextFunction) {
    try {
      const tokens = res.locals.tokenId as string;
      const jwtPayload = res.locals.jwtPayload as ITokenPayload;

      const result = await tokenService.refreshTokens(tokens, jwtPayload);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
}

export const authController = new AuthController();
