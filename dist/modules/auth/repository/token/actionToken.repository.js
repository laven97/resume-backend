"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionTokenRepository = void 0;
const actionToken_model_1 = require("../../model/token/actionToken.model");
class ActionTokenRepository {
    async create(dto) {
        return await actionToken_model_1.ActionToken.create(dto);
    }
    async getByToken(token) {
        return await actionToken_model_1.ActionToken.findOne({ token });
    }
    async deleteManyByParams(params) {
        await actionToken_model_1.ActionToken.deleteMany(params);
    }
}
exports.actionTokenRepository = new ActionTokenRepository();
