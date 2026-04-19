import { Router } from "express";
import { userController } from "../../controllers/user/user.controller";

const router = Router();

router.get("/me",userController.getMe)

export const userRouter = router;
