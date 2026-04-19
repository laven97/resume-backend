import { ApiError } from "../../errors/api-error";
import { ITokenPayload } from "../../interfaces/auth/token.interface";
import { IUser } from "../../interfaces/user/user.interface";
import { userRepository } from "../../repositories/user/user.repository";

class UserService {
  public async getMe(jwtPayload: ITokenPayload): Promise<IUser> {
    const user = await userRepository.getById(jwtPayload.userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user
  }
}

export const userService = new UserService();
