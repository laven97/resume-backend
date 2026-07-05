import { NextFunction, Request, Response } from "express";
import { IUserListQuery } from "../interface/user.interface";
import { userService } from "../service/user.service";

class UserController {
  public async getUserList(res: Response, req: Request, next: NextFunction) {
    try {
      const query = req.query as IUserListQuery;

      const result = await userService.getUsersList(query);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

export const userController = new UserController();
