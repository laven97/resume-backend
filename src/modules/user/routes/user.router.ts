import { Router } from "express";

import { userController } from "../controller/user.controller";
import { authMiddleware } from "../../../common/middleware/auth/auth.middleware";

const router = Router();

router.get("/me", authMiddleware.checkAccessToken, userController.getMe);
router.put(
  "/update/me",
  authMiddleware.checkAccessToken,
  userController.updateMe
);
router.delete(
  "/delete/me",
  authMiddleware.checkAccessToken,
  userController.deleteMe
);

export const userRouter = router;
