import { Router } from 'express';

import { passwordController } from '../../controller/password/password.controller.js';
import { authMiddleware } from '../../../../common/middleware/auth/auth.middleware.js';
import { commonMiddleware } from '../../../../common/middleware/common/common.middleware.js';
import { ActionTokenTypeEnum } from '../../enums/action-token-type.enum.js';
import { AuthValidation } from '../../validation/auth.validator.js';
import { celebrate } from 'celebrate';

const router = Router();

router.post('/forgot-password', passwordController.forgotPasswordSendEmail);
router.put(
  '/forgot-password',
  authMiddleware.checkAccessToken,
  authMiddleware.checkActionToken,
  passwordController.forgotPasswordReset,
);
router.put(
  '/change-password',
  celebrate({
    body: AuthValidation.changePassword,
  }),
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(AuthValidation.changePassword),
  passwordController.changePassword,
);

router.post(
  '/verify',
  authMiddleware.checkActionToken(ActionTokenTypeEnum.VERIFY_EMAIL),
  passwordController.verify,
);

export const passwordRouter = router;
