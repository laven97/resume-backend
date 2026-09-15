"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parfumeRepository = void 0;
const api_error_1 = require("../../../common/errors/api-error");
const parfume_model_1 = require("../model/parfume.model");
class ParfumeRepository {
    async createParfume(dto) {
        return await parfume_model_1.Parfume.create(dto);
    }
    async updateById(parfumeId, dto) {
        const parfume = await parfume_model_1.Parfume.findByIdAndUpdate(parfumeId, dto, {
            new: true,
        });
        if (!parfume) {
            throw new api_error_1.ApiError('Parfume not found ', 404);
        }
        return parfume;
    }
    async getParfumeList() {
        return await parfume_model_1.Parfume.find();
    }
    async getParfumeById(parfumeId) {
        return await parfume_model_1.Parfume.findOne({ _id: parfumeId });
    }
    async deleteById(parfumeId) {
        await parfume_model_1.Parfume.deleteOne({ _id: parfumeId });
    }
}
exports.parfumeRepository = new ParfumeRepository();
