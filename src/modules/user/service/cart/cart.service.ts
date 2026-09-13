import { ApiError } from '../../../../common/errors/api-error';
import { IParfume } from '../../../parfume/interface/parfume.interface';
import { ICart, ICartParfume } from '../../interface/cart/cart.interface';
import { cartRepository } from '../../repository/cart/cart.repository';

class CartService {
  public async getCart(): Promise<ICartParfume[]> {
    return await cartRepository.getCart();
  }

  public async addToCart(
    cartItem: IParfume,
    cartItemId: string,
  ): Promise<ICart> {
    const cartItemById = await cartRepository.getCartItemById(cartItemId);
    if (cartItemById) {
      throw new ApiError('Item already in cart', 400);
    }

    return await cartRepository.addToCart(cartItem);
  }

  public async increaseCartItemQuantity(
    cartItemId: string,
    quentity: number,
  ): Promise<ICart | null> {
    const cartItem = await cartRepository.increaseCartItemQuantity(
      cartItemId,
      quentity,
    );
    if (!cartItem) {
      throw new ApiError('Cart item not found', 404);
    }
    return cartItem;
  }

  public async removeCartItem(itemId: string): Promise<void> {
    return await cartRepository.removeCartItem(itemId);
  }

  public async clearCart(): Promise<void> {
    return await cartRepository.clearCart();
  }
}

export const cartService = new CartService();
