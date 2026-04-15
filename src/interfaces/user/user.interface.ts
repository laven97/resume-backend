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