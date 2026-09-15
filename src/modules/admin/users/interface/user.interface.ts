import { PickRequired } from "../../../auth/types/pick-requered.js";
import { IUser } from "../../../user/interface/user/user.interface.js";

import { OrderEnum } from "../enum/user.enum.js";
import { UserOrderListByEnum } from "../enum/userListOrderBy.enum.js";

export interface IUserListQuery {
  limit?: number;
  page?: number;
  search?: string;
  order?: OrderEnum;
  orderBy?: UserOrderListByEnum;
}

export type UserResponse = Pick<
  IUser,
  "name" | "email" | "role" | "avatar" | "isDeleted" | "isVerified"
> &
  PickRequired<IUser, "_id" | "createdAt">;

export interface IUserListResponse {
  users: UserResponse[];
  total: number;
}
