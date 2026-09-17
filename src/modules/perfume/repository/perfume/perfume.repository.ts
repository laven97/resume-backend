import { ApiError } from '../../../../common/errors/api-error.js';
import { IPerfume } from '../../interface/perfume.interface.js';
import { Perfume } from '../../model/perfume/perfume.model.js';

class PerfumeRepository {
  public async createParfume(dto: IPerfume): Promise<IPerfume> {
    return await Perfume.create(dto);
  }

  public async updateById(
    parfumeId: string,
    dto: Partial<IPerfume>,
  ): Promise<IPerfume> {
    const parfume = await Perfume.findByIdAndUpdate(parfumeId, dto, {
      new: true,
    });
    if (!parfume) {
      throw new ApiError('Parfume not found ', 404);
    }
    return parfume;
  }

  public async getParfumeList(): Promise<IPerfume[]> {
    return await Perfume.find();
  }

  public async getParfumeById(parfumeId: string): Promise<IPerfume | null> {
    return await Perfume.findOne({ _id: parfumeId });
  }

  public async deleteById(parfumeId: string): Promise<void> {
    await Perfume.deleteOne({ _id: parfumeId });
  }
}

export const perfumeRepository = new PerfumeRepository();
