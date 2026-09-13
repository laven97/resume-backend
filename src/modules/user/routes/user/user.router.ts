import { Router } from "express";
import { authMiddleware } from "../../../../common/middleware/auth/auth.middleware";
import { userController } from "../../controller/user/user.controller";




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
