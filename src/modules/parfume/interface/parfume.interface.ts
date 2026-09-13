export interface IParfume {
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
  photo: string;
}

export type ICartParfume = Pick<
  IParfume,
  'id' | 'name' | 'title' | 'price' | 'photo'
>;
