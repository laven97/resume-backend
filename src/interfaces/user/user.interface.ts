import { UserRole } from "../../enums/user/user.enum";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isVerified: boolean;
  isDeleted: boolean;
  phone?: string;
  avatar?: string;
}

export type SignInType = Pick<IUser, "email" | "password">;

export type IUserResponse = Pick<
  IUser,
  "_id" | "name" | "email" | "role" | "avatar" | "isDeleted" | "isVerified"
>;


export interface IUserListQuery {
  limit?:number,
  page?:number,
  search?:string,
}