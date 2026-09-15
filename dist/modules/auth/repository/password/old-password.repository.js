"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oldTokenRepository = void 0;
const oldPassword_model_1 = require("../../model/password/oldPassword.model");
class OldTokenRepository {
    async create(dto) {
        return await oldPassword_model_1.OldPassword.create(dto);
    }
    async findByParams(userId) {
        return await oldPassword_model_1.OldPassword.find({ _userId: userId });
    }
}
exports.oldTokenRepository = new OldTokenRepository();
