import {
  UserResponse,
} from "../../admin/users/interface/user.interface";
import { IUser } from "../interface/user/user.interface";


class UserPresenter {
  public toPublicResDto(entity: IUser): UserResponse {
    return {
      _id: entity._id,
      name: entity.name,
      email: entity.email,
      role: entity.role,
      avatar: entity.avatar,
      isDeleted: entity.isDeleted,
      isVerified: entity.isVerified,
      createdAt: entity.createdAt,
    };
  }
}

export const userPresenter = new UserPresenter();
