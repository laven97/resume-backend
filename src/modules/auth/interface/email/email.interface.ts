import { IUser } from "../../../user/interface/user.interface";

export interface IEmail {
  _id?: string;
  email: string;
  _userId: string;
}

export type IChangeEmail = Pick<IUser, "email">;
