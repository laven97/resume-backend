import { Response, Request, NextFunction } from "express";
import { IUser } from "../../interfaces/user/user.interface";
import { authService } from "../../services/auth/auth.service";

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
}

export const authController = new AuthController();
