import { Router } from "express";
import { passwordController } from "../../controller/password/password.controller";
import { authMiddleware } from "../../../../common/middleware/auth/auth.middleware";
import { commonMiddleware } from "../../../../common/middleware/common/common.middleware";
import { UserValidation } from "../../../user/validation/user.validation";
import { ActionTokenTypeEnum } from "../../enums/action-token-type.enum";

const router = Router();

router.post("/forgot-password", passwordController.forgotPasswordSendEmail);
router.put(
  "/forgot-password",
  authMiddleware.checkAccessToken,
  authMiddleware.checkActionToken,
  passwordController.forgotPasswordReset
);
router.put(
  "/change-password",
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(UserValidation.changePassword),
  passwordController.changePassword
);

router.post(
  "/verify",
  authMiddleware.checkActionToken(ActionTokenTypeEnum.VERIFY_EMAIL),
  passwordController.verify
);

export const passwordRouter = router;
