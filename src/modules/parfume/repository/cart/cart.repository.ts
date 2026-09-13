import { ICartParfume } from '../../interface/parfume.interface';
import { Cart } from '../../model/cart/cart.model';



class CartRepository {
  public async getCart(): Promise<ICartParfume[]> {
    return await Cart.find();
  }
}

export const cartRepository = new CartRepository();
