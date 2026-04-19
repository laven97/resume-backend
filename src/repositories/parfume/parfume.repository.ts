import { IParfume } from "../../interfaces/parfume/parfume.interface";
import { Parfume } from "../../models/parfume/parfume.model";

class ParfumeRepository{
    public async createParfume(dto:IParfume):Promise<IParfume>{
        return await Parfume.create(dto)
    }
}

export const parfumeRepository = new ParfumeRepository()