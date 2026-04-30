import { celebrate } from "celebrate";
import { Router } from "express";

import { ParfumeValidation } from "../validation/parfume.validation";
import { parfumeController } from "../controller/parfume.controllers";
import { verifyId } from "../../../common/middleware/common/verify-id.middleware";
import { roleState } from "../../../common/middleware/user/roleAuthentication.middleware";

const router = Router();

router.post(
  "/create",
  roleState.can("parfume:create"),
  celebrate(ParfumeValidation.createParfume),
  parfumeController.createParfume
);

router.put(
  "/update:parfumeId",
  roleState.can("parfume:update"),
  verifyId.verifyId,
  celebrate(ParfumeValidation.updateParfume),
  parfumeController.updateParfumeById
);

router.get(
  "/parfume:parfumeId",
  verifyId.verifyId,
  parfumeController.getParfumeById
);

router.get("/parfume/all", parfumeController.getParfumeList);

router.delete(
  "/delete:parfumeId",
  roleState.can("parfume:delete"),
  verifyId.verifyId,
  parfumeController.deleteById
);

export const parfumeRouter = router;
