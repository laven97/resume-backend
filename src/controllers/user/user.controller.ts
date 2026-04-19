import { NextFunction, Request, Response } from "express";
import { userService } from "../../services/user/user.service";
import { ITokenPayload } from "../../interfaces/auth/token.interface";
import { userPresenter } from "../../presenter/user/user.presenter";

class UserController {
  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = res.locals.jwtPayload as ITokenPayload;

      const user = await userService.getMe(jwtPayload);
      const result = userPresenter.toPublicResDto(user);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
