import { Router } from 'express';
import { celebrate } from 'celebrate';

import { authMiddleware } from '../../../common/middleware/auth/auth.middleware.js';
import { checkAccess } from '../../../common/middleware/user/roleAuthentication.middleware.js';
import { commonMiddleware } from '../../../common/middleware/common/common.middleware.js';
import { Permissions } from '../../user/types/permision.type.js';

import { perfumeController } from '../controller/perfume/perfume.controllers.js';
import { favoritePerfumeController } from '../controller/favorite/favorite.perfume.controller.js';
import { PerfumeValidation } from '../validation/perfume.validation.js';

const router = Router();

router.post(
  '/create',
  celebrate({
    body: PerfumeValidation.createPerfume,
  }),
  authMiddleware.checkAccessToken,
  checkAccess(Permissions.CREATE_PERFUME),
  perfumeController.createPerfume,
);

router.put(
  '/update:perfumeId',
  celebrate({
    body: PerfumeValidation.updatePerfume,
  }),
  authMiddleware.checkAccessToken,
  checkAccess(Permissions.UPDATE_PERFUME),
  commonMiddleware.verifyId,
  perfumeController.updateParfumeById,
);

router.get(
  '/perfume:perfumeId',
  authMiddleware.checkAccessToken,
  checkAccess(Permissions.READ_PERFUME),
  commonMiddleware.verifyId,
  perfumeController.getParfumeById,
);

router.get(
  '/perfume/all',
  authMiddleware.checkAccessToken,
  checkAccess(Permissions.READ_PERFUME),
  perfumeController.getParfumeList,
);

router.delete(
  '/delete:perfumeId',
  authMiddleware.checkAccessToken,
  checkAccess(Permissions.DELETE_PERFUME),
  commonMiddleware.verifyId,
  perfumeController.deleteById,
);

router.post(
  '/favorite/:perfumeId',
  authMiddleware.checkAccessToken,
  checkAccess(Permissions.ADD_TO_FAVORITES),
  favoritePerfumeController.addToFavorites,
);

export const perfumeRouter = router;
