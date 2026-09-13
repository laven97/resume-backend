import { ApiError } from '../../../../common/errors/api-error';
import { IParfume } from '../../../parfume/interface/parfume.interface';
import { ICartParfume } from '../../interface/cart/cart.interface';
import { cartRepository } from '../../repository/cart/cart.repository';

class CartService {
  public async getCart(): Promise<ICartParfume[]> {
    return await cartRepository.getCart();
  }

  public async addToCart(
    cartItem: IParfume,
    cartItemId: string,
  ): Promise<ICartParfume> {
    const cartItemById = await cartRepository.getCartItemById(cartItemId);
    if (cartItemById) {
      throw new ApiError('Item already in cart', 400);
    }

    return await cartRepository.addToCart(cartItem);
  }
}

export const cartService = new CartService();
