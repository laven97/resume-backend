import { IUserListQuery, IUserListResponse } from "../../admin/users/interface/user.interface";
import { IUser} from "../interface/user.interface";


class UserPresenter {
  private toPublicUser(entity: IUser) {
    return {
      _id: entity._id,
      name: entity.name,
      email: entity.email,
      role: entity.role,
      avatar: entity.avatar,
      isDeleted: entity.isDeleted,
      isVerified: entity.isVerified,
      createdAt: entity.createdAt
    };
  }

  public toPublicResDto(entities: IUser[],total:number,query:IUserListQuery): IUserListResponse {
    return {
      users: entities.map((entity) => this.toPublicUser(entity)),
      total,
      ...query
    }
  }

  public toListResDto(entities: IUser[], total: number, query: IUserListQuery) {
    return {
      data: entities.map((entity) => this.toPublicUser(entity)),
      total,
      ...query,
    };
  }
}

export const userPresenter = new UserPresenter();
