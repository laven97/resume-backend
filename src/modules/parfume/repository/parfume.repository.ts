import { IParfume } from "../interface/parfume.interface";
import { Parfume } from "../model/parfume.model";

class ParfumeRepository {
  public async createParfume(dto: IParfume): Promise<IParfume> {
    return await Parfume.create(dto);
  }
}

export const parfumeRepository = new ParfumeRepository();
