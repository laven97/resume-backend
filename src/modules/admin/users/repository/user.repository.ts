import { FilterQuery, SortOrder } from "mongoose";

import { IUser } from "../../../user/interface/user.interface";
import { IUserListQuery } from "../interface/user.interface";
import { UserOrderListByEnum } from "../enum/userListOrderBy.enum";
import { ApiError } from "../../../../common/errors/api-error";
import { User } from "../../../user/models/user.model";

class UserRepositiry {
  public async getAllUsers(query: IUserListQuery): Promise<[IUser[], number]> {
    const filterObj: FilterQuery<IUser> = {
      isVerified: true,
    };
    if (query.search) {
      filterObj.name = { $regex: query.search, $options: "i" };
    }
    const sortObj: { [key: string]: SortOrder } = {};
    switch (query.orderBy) {
      case UserOrderListByEnum.NAME:
        sortObj.name = query.order;
        break;
      case UserOrderListByEnum.EMAIL:
        sortObj.email = query.order;
        break;
      case UserOrderListByEnum.CREATED_AT:
        sortObj.createdAt = query.order;
        break;
      default:
        throw new ApiError("Invalid orderBy", 500);
    }

    const skip = query.limit * (query.page - 1);
    return await Promise.all([
      User.find(filterObj).sort(sortObj).limit(query.limit).skip(skip),
      User.countDocuments(filterObj),
    ]);
  }
}

export const userRepository = new UserRepositiry();
