import { User } from '../../models/user/user.model.js';
import { ApiError } from '../../../../common/errors/api-error.js';
class UserRepositiry {
    async createUser(dto) {
        return await User.create(dto);
    }
    async getById(id) {
        return await User.findById(id).select('+password');
    }
    async findOne(params) {
        return await User.findOne(params).select('+password');
    }
    async getByEmail(email) {
        return await User.findOne({ email }).select('+password');
    }
    async updateById(userId, dto) {
        const user = await User.findByIdAndUpdate(userId, dto, { new: true });
        if (!user) {
            throw new ApiError('User not found', 404);
        }
        return user;
    }
    async deleteMe(userId) {
        await User.deleteOne({ _id: userId });
    }
}
export const userRepository = new UserRepositiry();
