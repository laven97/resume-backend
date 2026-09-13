import { celebrate } from 'celebrate';
import { Router } from 'express';

import { authMiddleware } from '../../../../common/middleware/auth/auth.middleware';
import { checkAccess } from '../../../../common/middleware/user/roleAuthentication.middleware';
import { ParfumeValidation } from '../../validation/parfume.validation';
import { commonMiddleware } from '../../../../common/middleware/common/common.middleware';
import { Permissions } from '../../../user/types/permision.type';
import { parfumeController } from '../../controller/parfume/parfume.controllers';

const router = Router();

router.post(
  '/create',
  authMiddleware.checkAccessToken,
  checkAccess(Permissions.CREATE_PARFUME),
  celebrate(ParfumeValidation.createParfume),
  parfumeController.createParfume,
);

router.put(
  '/update:parfumeId',
  authMiddleware.checkAccessToken,
  checkAccess(Permissions.UPDATE_PARFUME),
  commonMiddleware.verifyId,
  celebrate(ParfumeValidation.updateParfume),
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
