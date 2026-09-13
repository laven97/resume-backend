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
}

export const cartController = new CartController();
