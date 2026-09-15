"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parfumeService = void 0;
const api_error_1 = require("../../../common/errors/api-error");
const parfume_repository_1 = require("../repository/parfume.repository");
class ParfumeService {
    async createParfume(dto) {
        const parfume = await parfume_repository_1.parfumeRepository.createParfume(dto);
        return parfume;
    }
    async updateParfumeById(parfumeId, dto) {
        const parfume = await parfume_repository_1.parfumeRepository.updateById(parfumeId, dto);
        return parfume;
    }
    async getAParfumeList() {
        const parfumeList = await parfume_repository_1.parfumeRepository.getParfumeList();
        return parfumeList;
    }
    async getParfumeById(parfumeId) {
        const parfume = await parfume_repository_1.parfumeRepository.getParfumeById(parfumeId);
        if (!parfume) {
            throw new api_error_1.ApiError('Current parfume not exist ', 404);
        }
        return parfume;
    }
    async deleteById(parfumeId) {
        return await parfume_repository_1.parfumeRepository.deleteById(parfumeId);
    }
}
exports.parfumeService = new ParfumeService();
