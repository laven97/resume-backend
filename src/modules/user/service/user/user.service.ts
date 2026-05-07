import { ApiError } from "../../../../common/errors/api-error";
import { ITokenPayload } from "../../../auth/interface/token.interface";
import { IUser } from "../../interface/user.interface";
import { userRepository } from "../../repository/user.repository";

class UserService {
  public async getMe(jwtPayload: ITokenPayload): Promise<IUser> {
    const user = await userRepository.getById(jwtPayload.id);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async updateMe(jwtPayload: ITokenPayload, dto: IUser): Promise<IUser> {
    return await userRepository.updateById(jwtPayload.id, dto);
  }

  public async deleteMe(jwtPayload: ITokenPayload): Promise<void> {
    return await userRepository.deleteMe(jwtPayload.id);
  }
}

export const userService = new UserService();
