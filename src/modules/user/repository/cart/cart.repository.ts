import { IParfume } from '../../../parfume/interface/parfume.interface';
import { ICartParfume } from '../../interface/cart/cart.interface';
import { Cart } from '../../models/cart/cart.model';

class CartRepository {
  public async getCart(): Promise<ICartParfume[]> {
    return await Cart.find();
  }

  public async addToCart(cartItem: IParfume): Promise<ICartParfume> {
    const newCartItem = new Cart(cartItem);
    return await newCartItem.save();
  }

  public async getCartItemById(
    cartItemId: string,
  ): Promise<ICartParfume | null> {
    return await Cart.findById(cartItemId);
  }
}

export const cartRepository = new CartRepository();
