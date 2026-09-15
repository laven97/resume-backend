import { Router } from 'express';
import { celebrate } from 'celebrate';

import { authMiddleware } from '../../../common/middleware/auth/auth.middleware.js';
import { checkAccess } from '../../../common/middleware/user/roleAuthentication.middleware.js';
import { parfumeController } from '../controller/parfume.controllers.js';
import { commonMiddleware } from '../../../common/middleware/common/common.middleware.js';
import { Permissions } from '../../user/types/permision.type.js';
import { ParfumeValidation } from '../validation/parfume.validation.js';

const router = Router();

router.post(
  '/create',
  celebrate({
    body: ParfumeValidation.createParfume,
  }),
  authMiddleware.checkAccessToken,
  checkAccess(Permissions.CREATE_PARFUME),
  parfumeController.createParfume,
);

router.put(
  '/update:parfumeId',
  celebrate({
    body: ParfumeValidation.updateParfume,
  }),
  authMiddleware.checkAccessToken,
  checkAccess(Permissions.UPDATE_PARFUME),
  commonMiddleware.verifyId,
  parfumeController.updateParfumeById,
);

router.get(
  '/parfume:parfumeId',
  authMiddleware.checkAccessToken,
  checkAccess(Permissions.READ_PARFUME),
  commonMiddleware.verifyId,
  parfumeController.getParfumeById,
);

router.get(
  '/parfume/all',
  authMiddleware.checkAccessToken,
  checkAccess(Permissions.READ_PARFUME),
  parfumeController.getParfumeList,
);

router.delete(
  '/delete:parfumeId',
  authMiddleware.checkAccessToken,
  checkAccess(Permissions.DELETE_PARFUME),
  commonMiddleware.verifyId,
  parfumeController.deleteById,
);

export const parfumeRouter = router;
