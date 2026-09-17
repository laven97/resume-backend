import { model, Schema } from 'mongoose';

import { IFavoritePerfume } from '../../interface/perfume.interface.js';

export const FavoritePerfumeSchema = new Schema({
  _id: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', requered: true },
  perfumeId: { type: Schema.Types.ObjectId, ref: 'Perfume', required: true },
});

export const FavoriteParfume = model<IFavoritePerfume>(
  'FavoritePerfume',
  FavoritePerfumeSchema,
);
