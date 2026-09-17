import { Types } from 'mongoose';
import { IPerfume } from '../../../perfume/interface/perfume.interface.js';


export interface ICart {
  _id?: string;
  userId: Types.ObjectId;
  perfume: Types.ObjectId;
  quantity: number;
}

export type ICartPerfume = Pick<
  IPerfume,
  'id' | 'name' | 'title' | 'price' | 'photo'
>;
