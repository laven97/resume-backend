"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../../service/user/user.service");
const user_presenter_1 = require("../../presenter/user.presenter");
class UserController {
    async getMe(req, res, next) {
        try {
            const jwtPayload = res.locals.jwtPayload;
            const user = await user_service_1.userService.getMe(jwtPayload);
            const result = user_presenter_1.userPresenter.toPublicResDto(user);
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
            const result = await user_service_1.userService.updateMe(jwtPayload, dto);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async deleteMe(req, res, next) {
        try {
            const jwtPayload = res.locals.jwtPayload;
            await user_service_1.userService.deleteMe(jwtPayload);
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.userController = new UserController();
