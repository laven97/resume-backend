import { Router } from "express";
import { passwordController } from "../../controller/password/password.controller";
import { authMiddleware } from "../../../../common/middleware/auth/auth.middleware";

const router = Router();

router.post("/forgot-password", passwordController.forgotPasswordSendEmail);
router.put(
  "/forgot-password",
  authMiddleware.checkAccessToken,
  authMiddleware.checkActionToken,
  passwordController.forgotPasswordReset
);

export const passwordRouter = router;
