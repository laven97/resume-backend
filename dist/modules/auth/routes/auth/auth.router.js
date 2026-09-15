import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authController } from '../../controller/auth/auth.controller.js';
import { authMiddleware } from '../../../../common/middleware/auth/auth.middleware.js';
import { AuthValidation } from '../../validation/auth.validator.js';
const router = Router();
router.post('/sign-up', celebrate({
    body: AuthValidation.registerUserSchema,
}), authController.signUp);
router.post('/sign-in', celebrate({
    body: AuthValidation.loginUserSchema,
}), authController.signIn);
router.post('/logout', celebrate({
    body: AuthValidation.logoutSchema,
}), authMiddleware.checkAccessToken, authController.logout);
router.post('refresh', authController.refreshTokens);
export const authRouter = router;
