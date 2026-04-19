import { NextFunction, Request, Response } from "express";
import { parfumeService } from "../../services/parfume/parfume.service";
import { IParfume } from "../../interfaces/parfume/parfume.interface";

class ParfumeController {
  public async createParfume(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IParfume;
      const result = parfumeService.createParfume(dto);
      res.status(200).json(result);
    } catch (err) {
      next();
    }
  }
}

export const parfumeController = new ParfumeController();
