import { ApiError } from "../../../common/errors/api-error";
import { IParfume } from "../interface/parfume.interface";
import { Parfume } from "../model/parfume.model";

class ParfumeRepository {
  public async createParfume(dto: IParfume): Promise<IParfume> {
    return await Parfume.create(dto);
  }

  public async updateById(
    parfumeId: string,
    dto: Partial<IParfume>
  ): Promise<IParfume> {
    const parfume = await Parfume.findByIdAndUpdate(parfumeId, dto, {
      new: true,
    });
    if (!parfume) {
      throw new ApiError("Parfume not found ", 404);
    }
    return parfume;
  }

  public async getParfumeList():Promise<IParfume[]>{
    return await Parfume.find()
  }

  public async getParfumeById(parfumeId: string): Promise<IParfume | null> {
    return await Parfume.findOne({ _id: parfumeId });
  }

  public async deleteById(parfumeId: string): Promise<void> {
    await Parfume.deleteOne({ _id: parfumeId });
  }
}

export const parfumeRepository = new ParfumeRepository();
