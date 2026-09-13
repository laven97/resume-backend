import { UserRole } from "../../../user/enum/userRole.enum";

export interface IToken {
  _id?: string;
  refreshToken: string;
  userId: string;
}

export interface ITokenPayload {
  id: string;
  role: UserRole;
}

export interface ITokenPair {
  refreshToken: string;
  accessToken: string;
}
