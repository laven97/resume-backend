import { OldPassword } from "../../model/password/oldPassword.model.js";
class OldTokenRepository {
    async create(dto) {
        return await OldPassword.create(dto);
    }
    async findByParams(userId) {
        return await OldPassword.find({ _userId: userId });
    }
}
export const oldTokenRepository = new OldTokenRepository();
