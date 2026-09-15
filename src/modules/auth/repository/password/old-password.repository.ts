import { IOldPassword } from "../../interface/password/old-password.interface";
import { OldPassword } from "../../model/password/oldPassword.model";

class OldTokenRepository {
  public async create(dto: IOldPassword): Promise<IOldPassword> {
    return await OldPassword.create(dto);
  }

  public async findByParams(userId:string): Promise<IOldPassword[]> {
    return await OldPassword.find({ _userId: userId });
  }
}

export const oldTokenRepository = new OldTokenRepository();
