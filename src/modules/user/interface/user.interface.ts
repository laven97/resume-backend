import { UserRole } from "../enum/userRole.enum";

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
  createdAt: Date;
  deletedAt?: Date;
}

export type SignInType = Pick<IUser, "email" | "password">;
