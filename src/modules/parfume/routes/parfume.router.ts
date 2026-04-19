import { celebrate } from "celebrate";
import { Router } from "express";

import { ParfumeValidation } from "../validation/parfume.validation";
import { parfumeController } from "../controller/parfume.controllers";

const router = Router();

router.post(
  "/create-parfume",
  celebrate(ParfumeValidation.createParfume),
  parfumeController.createParfume
);

export const parfumeRouter = router;
