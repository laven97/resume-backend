import { ApiError } from '../../../../common/errors/api-error.js';
import { userRepository } from '../../repository/user/user.repository.js';
class UserService {
    async getMe(jwtPayload) {
        const user = await userRepository.getById(jwtPayload.id);
        if (!user) {
            throw new ApiError('User not found', 404);
        }
        return user;
    }
    async updateMe(jwtPayload, dto) {
        return await userRepository.updateById(jwtPayload.id, dto);
    }
    async deleteMe(jwtPayload) {
        return await userRepository.deleteMe(jwtPayload.id);
    }
}
export const userService = new UserService();
