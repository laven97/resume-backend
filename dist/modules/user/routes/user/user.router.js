import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authMiddleware } from '../../../../common/middleware/auth/auth.middleware.js';
import { userController } from '../../controller/user/user.controller.js';
import { UserValidation } from '../../validation/user.validation.js';
const router = Router();
router.get('/me', authMiddleware.checkAccessToken, userController.getMe);
router.put('/update/me', celebrate({
    body: UserValidation.updateUser,
}), authMiddleware.checkAccessToken, userController.updateMe);
router.delete('/delete/me', authMiddleware.checkAccessToken, userController.deleteMe);
export const userRouter = router;
