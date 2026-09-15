"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const api_error_1 = require("../../../../common/errors/api-error");
const user_repository_1 = require("../../repository/user/user.repository");
class UserService {
    async getMe(jwtPayload) {
        const user = await user_repository_1.userRepository.getById(jwtPayload.id);
        if (!user) {
            throw new api_error_1.ApiError('User not found', 404);
        }
        return user;
    }
    async updateMe(jwtPayload, dto) {
        return await user_repository_1.userRepository.updateById(jwtPayload.id, dto);
    }
    async deleteMe(jwtPayload) {
        return await user_repository_1.userRepository.deleteMe(jwtPayload.id);
    }
}
exports.userService = new UserService();
