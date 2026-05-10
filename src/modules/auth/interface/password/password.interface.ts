import { IUser } from "../../../user/interface/user.interface";

export type IResetPasswordSendEmail = Pick<IUser, "email">;

export type IResetPasswordSet = Pick<IUser, "password"> & { token: string };
