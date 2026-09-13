import { IParfume } from '../../../parfume/interface/parfume.interface';

export type ICartParfume = Pick<
  IParfume,
  'id' | 'name' | 'title' | 'price' | 'photo'
>;
