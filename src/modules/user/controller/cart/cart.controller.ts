import { Request, Response, NextFunction } from 'express';

import { cartService } from '../../service/cart/cart.service';

class CartController {
  public async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      const resulte = await cartService.getCart();

      res.status(200).json(resulte);
    } catch (err) {
      next(err);
    }
  }

  public async addToCart(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId, quantity } = req.body;
      const result = await cartService.addToCart(productId, quantity);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  public async increaseCartItemQuantity(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { parfumeId } = req.params;
      const { quantity } = req.body;
      const result = await cartService.increaseCartItemQuantity(
        parfumeId,
        quantity,
      );
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

export const cartController = new CartController();
