
import { ApiError } from "../../../common/errors/api-error";
import { IUser } from "../interface/user.interface";
import { User } from "../models/user.model";

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

  public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
    const user = await User.findByIdAndUpdate(userId, dto, { new: true });
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async deleteMe(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }
}

export const userRepository = new UserRepositiry();
