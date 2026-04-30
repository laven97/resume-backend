import { NextFunction, Request, Response } from "express";

import { IParfume } from "../interface/parfume.interface";
import { parfumeService } from "../service/parfume.service";

class ParfumeController {
  public async createParfume(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IParfume;
      const result = await parfumeService.createParfume(dto);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  public async updateParfumeById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { parfumeId } = req.params;
      const dto = req.body as IParfume;

      const result = await parfumeService.updateParfumeById(parfumeId, dto);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  public async getParfumeById(req: Request, res: Response, next: NextFunction) {
    try {
      const { parfumeId } = req.params;
      const result = await parfumeService.getParfumeById(parfumeId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  public async getParfumeList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await parfumeService.getAParfumeList();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { parfumeId } = req.params;
      await parfumeService.deleteById(parfumeId);
      res.status(204);
    } catch (err) {
      next(err);
    }
  }
}

export const parfumeController = new ParfumeController();
