import { NextFunction, Request, Response } from "express";

import {
  IChangePassword,
  IResetPasswordSendEmail,
  IResetPasswordSet,
} from "../../interface/password/password.interface.js";
import { passwordService } from "../../service/password/password.service.js";
import { ITokenPayload } from "../../interface/token/token.interface.js";

class PasswordContoller {
  public async forgotPasswordSendEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const dto = req.body as IResetPasswordSendEmail;
      await passwordService.forgotPasswordSendEmail(dto);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  public async forgotPasswordReset(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const jwtPayload = res.locals.jwtPayload as ITokenPayload;
      const dto = req.body as IResetPasswordSet;

      await passwordService.forgotPasswordReset(dto, jwtPayload);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  public async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = res.locals.jwtPayload as ITokenPayload;
      const dto = req.body as IChangePassword;

      await passwordService.changePassword(jwtPayload, dto);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  public async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = res.locals.jwtPayload as ITokenPayload;
      await passwordService.verify(jwtPayload);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

export const passwordController = new PasswordContoller();
