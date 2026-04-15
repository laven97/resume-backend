import { IUser } from "../../interfaces/user/user.interface";
import { User } from "../../models/user/user.model";

class UserRepositiry {
  public async createUser(dto: IUser): Promise<IUser> {
    return await User.create(dto);
  }
}

export const userRepository = new UserRepositiry();
