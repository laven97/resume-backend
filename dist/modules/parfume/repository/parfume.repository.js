import { ApiError } from "../../../common/errors/api-error.js";
import { Parfume } from "../model/parfume.model.js";
class ParfumeRepository {
    async createParfume(dto) {
        return await Parfume.create(dto);
    }
    async updateById(parfumeId, dto) {
        const parfume = await Parfume.findByIdAndUpdate(parfumeId, dto, {
            new: true,
        });
        if (!parfume) {
            throw new ApiError('Parfume not found ', 404);
        }
        return parfume;
    }
    async getParfumeList() {
        return await Parfume.find();
    }
    async getParfumeById(parfumeId) {
        return await Parfume.findOne({ _id: parfumeId });
    }
    async deleteById(parfumeId) {
        await Parfume.deleteOne({ _id: parfumeId });
    }
}
export const parfumeRepository = new ParfumeRepository();
