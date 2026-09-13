import { Router } from 'express';

import { cartController } from '../../controller/cart/cart.controller';

const router = Router();

router.get('', cartController.getCart);

export const cartRouter = router;
