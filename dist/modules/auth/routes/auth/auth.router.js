import { Router } from 'express';
import { authController } from '../../controller/auth/auth.controller.js';
import { authMiddleware } from '../../../../common/middleware/auth/auth.middleware.js';
const router = Router();
router.post('/sign-up', authController.signUp);
router.post('/sign-in', authController.signIn);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('refresh', authController.refreshTokens);
export const authRouter = router;
