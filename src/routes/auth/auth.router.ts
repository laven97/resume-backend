import { Router } from "express";
import { celebrate } from "celebrate";

import { authController } from "../../controllers/auth/auth.controller";
import { AuthValidation } from "../../validation/auth/auth.validator";

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

router.post("/logout", authController.logout);

export const authRouter = router;
