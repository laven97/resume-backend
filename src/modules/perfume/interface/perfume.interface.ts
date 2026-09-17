import { Types } from 'mongoose';

export interface IPerfume {
  id?: string;
  name?: string;
  title?: string;
  description?: string;
  atmosphere?: string;
  longevity?: string;
  topNotes?: string;
  heartNotes?: string;
  baseNotes?: string;
  price?: number;
  stock: boolean;
  photo?: string;
}

export interface IFavoritePerfume {
  _id?: string;
  userId?: Types.ObjectId;
  perfumeId?: Types.ObjectId;
}

export type IFavoritePerfumeRespose = Pick<
  IPerfume,
  'id' | 'name' | 'title' | 'price' | 'photo'
>;
