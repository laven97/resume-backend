import { Types } from 'mongoose';
import { IParfume } from '../../../parfume/interface/parfume.interface';

export interface ICart {
  _id?: string;
  userId: Types.ObjectId;
  parfume: Types.ObjectId;
  quantity: number;
}

export type ICartParfume = Pick<
  IParfume,
  'id' | 'name' | 'title' | 'price' | 'photo'
>;
