import { IUser } from "../../interfaces/user/user.interface";
import { User } from "../../models/user/user.model";

class UserRepositiry {
  public async createUser(dto: IUser): Promise<IUser> {
    return await User.create(dto);
  }

  public async getById(id: string): Promise<IUser | null> {
    return await User.findById(id).select("+password");
  }

  public async getByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).select("+password");
  }
}

export const userRepository = new UserRepositiry();
