import { NextFunction, Request, Response } from "express";
import { ITokenPayload } from "../../../auth/interface/token.interface";
import { userService } from "../../service/user/user.service";
import { userPresenter } from "../../presenter/user.presenter";
import { IUser } from "../../interface/user.interface";

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

  public async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtPayload = res.locals.jwtPayload as ITokenPayload;
      const dto = req.body as IUser;

      const result = await userService.updateMe(jwtPayload, dto);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  public async deleteMe(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const jwtPayload = res.locals.jwtPayload as ITokenPayload;
      await userService.deleteMe(jwtPayload);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
