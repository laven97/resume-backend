import { Token } from "../../model/token/token.model.js";
class TokenRepository {
    async create(dto) {
        return await Token.create(dto);
    }
    async deleteOneByParams(params) {
        await Token.deleteOne(params);
    }
    async findByParams(params) {
        return await Token.findOne(params);
    }
}
export const tokenRepository = new TokenRepository();
