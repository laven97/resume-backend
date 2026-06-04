import { Router } from "express";
import { authMiddleware } from "../../../../common/middleware/auth/auth.middleware";
import { emailController } from "../../controller/email/email.controller";
import { ActionTokenTypeEnum } from "../../enums/action-token-type.enum";

const router = Router();

router.post(
  "/email/change-email",
  authMiddleware.checkActionToken(ActionTokenTypeEnum.CHANGE_EMAIL),
  emailController.changeEmailRequest
);
router.put(
  "/email/change-email",
  authMiddleware.checkActionToken(ActionTokenTypeEnum.CHANGE_EMAIL),
  emailController.changeEmailConfirmation
);

export const emailRouter = router;
