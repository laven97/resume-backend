import { NextFunction, Request, Response } from 'express';
import { ITokenPayload } from '../../interface/token/token.interface.js';
import { emailActionService } from '../../service/email/emailAction.service.js';
import { IActionToken } from '../../interface/token/actionTokne.interface.js';

class EmailConroller {
  public async changeEmailRequest(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const jwtPayload = res.locals.jwtPayload as ITokenPayload;
      const { newEmail } = req.body;
      await emailActionService.changeEmailRequest(jwtPayload, newEmail);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }

  public async changeEmailConfirmation(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const tokens = res.locals.tokenId as IActionToken;
      await emailActionService.changeEmailConfirmation(tokens);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

export const emailController = new EmailConroller();
