import { ActionToken } from "../../model/token/actionToken.model.js";
class ActionTokenRepository {
    async create(dto) {
        return await ActionToken.create(dto);
    }
    async getByToken(token) {
        return await ActionToken.findOne({ token });
    }
    async deleteManyByParams(params) {
        await ActionToken.deleteMany(params);
    }
}
export const actionTokenRepository = new ActionTokenRepository();
