import { IUserListQuery, IUserListResponse } from "../interface/user.interface";
import { userRepository } from "../repository/user.repository";
import { userPresenter } from "../../../user/presenter/user.presenter";

class UserService {
  public async getUsersList(query: IUserListQuery): Promise<IUserListResponse> {
    const [entities, total] = await userRepository.getAllUsers(query);

    return {
        users:entities.map(userPresenter.toPublicResDto),
        total,
    }
  }
}

export const userService = new UserService();
