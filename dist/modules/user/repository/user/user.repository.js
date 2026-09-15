"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const user_model_1 = require("../../models/user/user.model");
const api_error_1 = require("../../../../common/errors/api-error");
class UserRepositiry {
    async createUser(dto) {
        return await user_model_1.User.create(dto);
    }
    async getById(id) {
        return await user_model_1.User.findById(id).select('+password');
    }
    async findOne(params) {
        return await user_model_1.User.findOne(params).select('+password');
    }
    async getByEmail(email) {
        return await user_model_1.User.findOne({ email }).select('+password');
    }
    async updateById(userId, dto) {
        const user = await user_model_1.User.findByIdAndUpdate(userId, dto, { new: true });
        if (!user) {
            throw new api_error_1.ApiError('User not found', 404);
        }
        return user;
    }
    async deleteMe(userId) {
        await user_model_1.User.deleteOne({ _id: userId });
    }
}
exports.userRepository = new UserRepositiry();
