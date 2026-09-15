import { Cart } from '../../models/cart/cart.model.js';
class CartRepository {
    async getCart() {
        return await Cart.find();
    }
    async addToCart(cartItem) {
        const newCartItem = new Cart(cartItem);
        return await newCartItem.save();
    }
    async getCartItemById(cartItemId) {
        return await Cart.findById(cartItemId);
    }
    async increaseCartItemQuantity(cartItemId, quentity) {
        const cartItem = await Cart.findById(cartItemId);
        if (!cartItem)
            return null;
        cartItem.quantity += quentity;
        return await cartItem.save();
    }
    async removeCartItem(itemId) {
        await Cart.findByIdAndDelete(itemId);
    }
    async clearCart() {
        await Cart.deleteMany();
    }
}
export const cartRepository = new CartRepository();
