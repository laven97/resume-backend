import { Request, Response, NextFunction } from 'express';

import { favoritePerfumeService } from '../../service/favorite/favorite.perfume.service.js';

class FavoritePerfumeController {
  public async addToFavorites(
    req: Request<{ userId: string; parfumeId: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { userId, parfumeId } = req.body;
      const result = await favoritePerfumeService.addToFavorites(
        userId,
        parfumeId,
      );

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
}

export const favoritePerfumeController = new FavoritePerfumeController();
