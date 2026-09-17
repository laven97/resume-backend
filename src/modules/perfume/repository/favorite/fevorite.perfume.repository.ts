import { IFavoritePerfumeRespose } from '../../interface/perfume.interface.js';
import { FavoriteParfume } from '../../model/favorite/favorite.model.js';

class FavoritePerfumeRepository {
  public async addFavoriteParfume(
    userId: string,
    perfumeId: string,
  ): Promise<IFavoritePerfumeRespose> {
    return await FavoriteParfume.create({ userId, perfumeId });
  }
}

export const favoritePerfumeRepository = new FavoritePerfumeRepository();
