import { ICartParfume } from '../../interface/parfume.interface';
import { cartRepository } from '../../repository/cart/cart.repository';

class CartService {
  public async getCart(): Promise<ICartParfume[]> {
    return await cartRepository.getCart();
  }
}

export const cartService = new CartService();
