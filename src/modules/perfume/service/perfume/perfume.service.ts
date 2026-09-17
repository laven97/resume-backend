import { ApiError } from '../../../../common/errors/api-error.js';
import { IPerfume } from '../../interface/perfume.interface.js';
import { perfumeRepository } from '../../repository/perfume/perfume.repository.js';

class PerfumeService {
  public async createParfume(dto: IPerfume): Promise<IPerfume> {
    const perfume = await perfumeRepository.createParfume(dto);
    return perfume;
  }

  public async updateParfumeById(
    parfumeId: string,
    dto: Partial<IPerfume>,
  ): Promise<IPerfume> {
    const perfume = await perfumeRepository.updateById(parfumeId, dto);
    return perfume;
  }

  public async getAParfumeList(): Promise<IPerfume[]> {
    const perfumeList = await perfumeRepository.getParfumeList();
    return perfumeList;
  }

  public async getParfumeById(perfumeId: string): Promise<IPerfume> {
    const parfume = await perfumeRepository.getParfumeById(perfumeId);
    if (!parfume) {
      throw new ApiError('Current perfume not exist ', 404);
    }
    return parfume;
  }

  public async deleteById(perfumeId: string): Promise<void> {
    return await perfumeRepository.deleteById(perfumeId);
  }
}

export const perfumeService = new PerfumeService();
