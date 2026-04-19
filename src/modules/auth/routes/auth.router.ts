import { Router } from "express";
import { celebrate } from "celebrate";

import { AuthValidation } from "../validation/auth.validator";
import { authController } from "../controller/auth.controller";

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
