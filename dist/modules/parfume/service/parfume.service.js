import { ApiError } from '../../../common/errors/api-error.js';
import { parfumeRepository } from '../repository/parfume.repository.js';
class ParfumeService {
    async createParfume(dto) {
        const parfume = await parfumeRepository.createParfume(dto);
        return parfume;
    }
    async updateParfumeById(parfumeId, dto) {
        const parfume = await parfumeRepository.updateById(parfumeId, dto);
        return parfume;
    }
    async getAParfumeList() {
        const parfumeList = await parfumeRepository.getParfumeList();
        return parfumeList;
    }
    async getParfumeById(parfumeId) {
        const parfume = await parfumeRepository.getParfumeById(parfumeId);
        if (!parfume) {
            throw new ApiError('Current parfume not exist ', 404);
        }
        return parfume;
    }
    async deleteById(parfumeId) {
        return await parfumeRepository.deleteById(parfumeId);
    }
}
export const parfumeService = new ParfumeService();
