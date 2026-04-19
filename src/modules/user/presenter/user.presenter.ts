import { IUser, IUserListQuery, IUserResponse } from "../interface/user.interface";


class UserPresenter {
  public toPublicResDto(entity: IUser): IUserResponse {
    return {
      _id: entity._id,
      name: entity.name,
      email: entity.email,
      role: entity.role,
      avatar: entity.avatar,
      isDeleted: entity.isDeleted,
      isVerified: entity.isVerified,
    };
  }

  public toListResDto(entities: IUser[], total: number, query: IUserListQuery) {
    return {
      data: entities.map(this.toPublicResDto),
      total,
      ...query,
    };
  }
}

export const userPresenter = new UserPresenter();
