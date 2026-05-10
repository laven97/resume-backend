import { celebrate } from "celebrate";
import { Router } from "express";
import { authMiddleware } from "../../../../common/middleware/auth/auth.middleware";
import { checkAccess } from "../../../../common/middleware/user/roleAuthentication.middleware";
import { ParfumeValidation } from "../../validation/parfume.validation";
import { parfumeController } from "../../controller/parfume.controllers";
import { commonMiddleware } from "../../../../common/middleware/common/common.middleware";


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
  commonMiddleware.verifyId,
  celebrate(ParfumeValidation.updateParfume),
  parfumeController.updateParfumeById
);

router.get(
  "/parfume:parfumeId",
  authMiddleware.checkAccessToken,
  checkAccess("parfume:read"),
  commonMiddleware.verifyId,
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
  commonMiddleware.verifyId,
  parfumeController.deleteById
);

export const parfumeRouter = router;
