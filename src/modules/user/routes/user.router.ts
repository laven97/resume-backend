import { Router } from "express";

import { userController } from "../controller/user.controller";


const router = Router();

router.get("/me", userController.getMe);
router.put("/update/me", userController.updateMe);
router.delete("/delete/me", userController.deleteMe);

export const userRouter = router;
