import { ApiError } from '../../../../common/errors/api-error';
import { IParfume } from '../../interface/parfume.interface';
import { parfumeRepository } from '../../repository/parfume/parfume.repository';

class ParfumeService {
  public async createParfume(dto: IParfume): Promise<IParfume> {
    const parfume = await parfumeRepository.createParfume(dto);
    return parfume;
  }

  public async updateParfumeById(
    parfumeId: string,
    dto: Partial<IParfume>,
  ): Promise<IParfume> {
    const parfume = await parfumeRepository.updateById(parfumeId, dto);
    return parfume;
  }

  public async getAParfumeList(): Promise<IParfume[]> {
    const parfumeList = await parfumeRepository.getParfumeList();
    return parfumeList;
  }

  public async getParfumeById(parfumeId: string): Promise<IParfume> {
    const parfume = await parfumeRepository.getParfumeById(parfumeId);
    if (!parfume) {
      throw new ApiError('Current parfume not exist ', 404);
    }
    return parfume;
  }

  public async deleteById(parfumeId: string): Promise<void> {
    return await parfumeRepository.deleteById(parfumeId);
  }
}

export const parfumeService = new ParfumeService();
