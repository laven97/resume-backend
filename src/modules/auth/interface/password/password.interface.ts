import { IUser } from '../../../user/interface/user/user.interface';

export type IResetPasswordSendEmail = Pick<IUser, 'email'>;

export type IResetPasswordSet = Pick<IUser, 'password'> & { token: string };

export type IChangePassword = Pick<IUser, 'password'> & { oldPassword: string };
