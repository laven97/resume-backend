import { IUserListQuery, IUserListResponse } from "../interface/user.interface";
import { userRepository } from "../repository/user.repository";
import { userPresenter } from "../../../user/presenter/user.presenter";

class UserService {
  public async getUsersList(query: IUserListQuery): Promise<IUserListResponse> {
    const [entities, total] = await userRepository.getAllUsers(query);

    const listDto = userPresenter.toListResDto(entities, total, query);
    return {
      users: listDto.data,
      total: listDto.total,
    };
  }
}

export const userService = new UserService();
