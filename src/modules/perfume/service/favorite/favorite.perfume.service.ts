import { IFavoritePerfumeRespose } from '../../interface/perfume.interface.js';
import { favoritePerfumeRepository } from '../../repository/favorite/fevorite.perfume.repository.js';

class FavoritePerfumeService {
  public async addToFavorites(
    userId: string,
    parfumeId: string,
  ): Promise<IFavoritePerfumeRespose> {
    return await favoritePerfumeRepository.addFavoriteParfume(
      userId,
      parfumeId,
    );
  }
}

export const favoritePerfumeService = new FavoritePerfumeService();
