import { celebrate } from "celebrate";
import { Router } from "express";
import { authMiddleware } from "../../../../common/middleware/auth/auth.middleware";
import { checkAccess } from "../../../../common/middleware/user/roleAuthentication.middleware";
import { ParfumeValidation } from "../../validation/parfume.validation";
import { parfumeController } from "../../controller/parfume.controllers";
import { verifyId } from "../../../../common/middleware/common/verify-id.middleware";

const router = Router();

router.post(
  "/create",
  authMiddleware.checkAccessToken,
  checkAccess("parfume:create"),
  celebrate(ParfumeValidation.createParfume),
  parfumeController.createParfume
);

router.put(
  "/update:parfumeId",
  authMiddleware.checkAccessToken,
  checkAccess("parfume:update"),
  verifyId.verifyId,
  celebrate(ParfumeValidation.updateParfume),
  parfumeController.updateParfumeById
);

router.get(
  "/parfume:parfumeId",
  authMiddleware.checkAccessToken,
  checkAccess("parfume:read"),
  verifyId.verifyId,
  parfumeController.getParfumeById
);

router.get(
  "/parfume/all",
  authMiddleware.checkAccessToken,
  checkAccess("parfume:read"),
  parfumeController.getParfumeList
);

router.delete(
  "/delete:parfumeId",
  authMiddleware.checkAccessToken,
  checkAccess("parfume:delete"),
  verifyId.verifyId,
  parfumeController.deleteById
);

export const parfumeRouter = router;
