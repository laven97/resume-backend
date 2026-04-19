import { NextFunction, Request, Response } from "express";

import { IParfume } from "../interface/parfume.interface";
import { parfumeService } from "../service/parfume.service";

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
