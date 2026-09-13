import { IParfume } from '../../../parfume/interface/parfume.interface';
import { ICart, ICartParfume } from '../../interface/cart/cart.interface';
import { Cart } from '../../models/cart/cart.model';

class CartRepository {
  public async getCart(): Promise<ICartParfume[]> {
    return await Cart.find();
  }

  public async addToCart(cartItem: IParfume): Promise<ICart> {
    const newCartItem = new Cart(cartItem);
    return await newCartItem.save();
  }

  public async getCartItemById(
    cartItemId: string,
  ): Promise<ICartParfume | null> {
    return await Cart.findById(cartItemId);
  }

  public async increaseCartItemQuantity(
    cartItemId: string,
    quentity: number,
  ): Promise<ICart | null> {
    const cartItem = await Cart.findById(cartItemId);
    if (!cartItem) return null;

    cartItem.quantity += quentity;

    return await cartItem.save();
  }
}

export const cartRepository = new CartRepository();
