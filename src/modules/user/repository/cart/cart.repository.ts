import { ICartParfume } from '../../interface/cart/cart.interface';
import { Cart } from '../../models/cart/cart.model';

class CartRepository {
  public async getCart(): Promise<ICartParfume[]> {
    return await Cart.find();
  }
}

export const cartRepository = new CartRepository();
