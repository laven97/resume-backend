import { IParfume } from "../../interfaces/parfume/parfume.interface";
import { parfumeRepository } from "../../repositories/parfume/parfume.repository";

class ParfumeService {
  public async createParfume(dto: IParfume): Promise<IParfume> {
    const parfume = await parfumeRepository.createParfume(dto);
    return parfume;
  }
}

export const parfumeService = new ParfumeService();
