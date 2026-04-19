import { UserRole } from "../../user/emum/user.enum";

export interface IToken {
  _id?: string;
  refreshToken: string;
  userId: string;
}

export interface ITokenPayload {
  userId: string;
  role: UserRole;
}

export interface ITokenPair {
  refreshToken: string;
  accessToken: string;
}
