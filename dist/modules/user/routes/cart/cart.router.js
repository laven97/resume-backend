import { Router } from 'express';
import { cartController } from '../../controller/cart/cart.controller.js';
const router = Router();
router.get('', cartController.getCart);
router.post('/add', cartController.addToCart);
router.put('/item/:id', cartController.increaseCartItemQuantity);
router.delete('/item/:id', cartController.removeCartItem);
router.delete('/clear', cartController.clearCart);
export const cartRouter = router;
