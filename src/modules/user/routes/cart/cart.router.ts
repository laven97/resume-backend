import { Router } from 'express';

import { cartController } from '../../controller/cart/cart.controller.js';
import { authMiddleware } from '../../../../common/middleware/auth/auth.middleware.js';

const router = Router();

router.get('', authMiddleware.checkAccessToken, cartController.getCart);
router.post('/add', authMiddleware.checkAccessToken, cartController.addToCart);
router.put(
  '/item/:id',
  authMiddleware.checkAccessToken,
  cartController.increaseCartItemQuantity,
);
router.delete(
  '/item/:id',
  authMiddleware.checkAccessToken,
  cartController.removeCartItem,
);
router.delete(
  '/clear',
  authMiddleware.checkAccessToken,
  cartController.clearCart,
);

export const cartRouter = router;
