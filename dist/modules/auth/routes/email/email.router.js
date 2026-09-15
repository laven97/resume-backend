import { Router } from "express";
import { authMiddleware } from "../../../../common/middleware/auth/auth.middleware.js";
import { emailController } from "../../controller/email/email.controller.js";
import { ActionTokenTypeEnum } from "../../enums/action-token-type.enum.js";
const router = Router();
router.post("/email/change-email", authMiddleware.checkActionToken(ActionTokenTypeEnum.CHANGE_EMAIL), emailController.changeEmailRequest);
router.put("/email/change-email", authMiddleware.checkActionToken(ActionTokenTypeEnum.CHANGE_EMAIL), emailController.changeEmailConfirmation);
export const emailRouter = router;
