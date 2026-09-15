import { userService } from "../../service/user/user.service.js";
import { userPresenter } from "../../presenter/user.presenter.js";
class UserController {
    async getMe(req, res, next) {
        try {
            const jwtPayload = res.locals.jwtPayload;
            const user = await userService.getMe(jwtPayload);
            const result = userPresenter.toPublicResDto(user);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async updateMe(req, res, next) {
        try {
            const jwtPayload = res.locals.jwtPayload;
            const dto = req.body;
            const result = await userService.updateMe(jwtPayload, dto);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async deleteMe(req, res, next) {
        try {
            const jwtPayload = res.locals.jwtPayload;
            await userService.deleteMe(jwtPayload);
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }
}
export const userController = new UserController();
