import { Router } from "express";
import {celebrate} from "celebrate"

import { authController } from "../../controllers/auth/auth.controller";
import { AuthValidation } from "../../validation/auth/auth.validator";

const router = Router();

router.post(
  "/sign-up",
  celebrate(AuthValidation.registerUserSchema),
  authController.signUp
);

export const authRouter = router;
