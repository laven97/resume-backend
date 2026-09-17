import { NextFunction, Request, Response } from 'express';
import { IPerfume } from '../../interface/perfume.interface.js';
import { perfumeService } from '../../service/perfume/perfume.service.js';

class PerfumeController {
  public async createPerfume(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IPerfume;
      const result = await perfumeService.createParfume(dto);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  public async updateParfumeById(
    req: Request<{ parfumeId: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { parfumeId } = req.params;
      const dto = req.body as IPerfume;

      const result = await perfumeService.updateParfumeById(parfumeId, dto);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  public async getParfumeById(
    req: Request<{ parfumeId: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { parfumeId } = req.params;
      const result = await perfumeService.getParfumeById(parfumeId);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  public async getParfumeList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await perfumeService.getAParfumeList();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  public async deleteById(
    req: Request<{ parfumeId: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { parfumeId } = req.params;
      await perfumeService.deleteById(parfumeId);
      res.status(204);
    } catch (err) {
      next(err);
    }
  }
}

export const perfumeController = new PerfumeController();
