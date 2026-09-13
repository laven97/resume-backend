import { Router } from 'express';

import { cartController } from '../../controller/cart/cart.controller';

const router = Router();

router.get('', cartController.getCart);
router.post('/add', cartController.addToCart);
router.put('/item/:id', cartController.increaseCartItemQuantity);

export const cartRouter = router;
