import { Router } from "express";
import { celebrate } from "celebrate";

import { AuthValidation } from "../../validation/auth.validator";
import { authController } from "../../controller/auth/auth.controller";
import { authMiddleware } from "../../../../common/middleware/auth/auth.middleware";

const router = Router();

router.post(
  "/sign-up",
  celebrate(AuthValidation.registerUserSchema),
  authController.signUp
);

router.post(
  "/sign-in",
  celebrate(AuthValidation.loginUserSchema),
  authController.signIn
);

router.post(
  "/logout",
  authMiddleware.checkAccessToken,
  celebrate(AuthValidation.logoutSchema),
  authController.logout
);

router.post("refresh", authController.refreshTokens);

export const authRouter = router;
