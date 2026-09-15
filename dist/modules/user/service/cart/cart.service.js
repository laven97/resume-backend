import { ApiError } from '../../../../common/errors/api-error.js';
import { cartRepository } from '../../repository/cart/cart.repository.js';
class CartService {
    async getCart() {
        return await cartRepository.getCart();
    }
    async addToCart(cartItem, cartItemId) {
        const cartItemById = await cartRepository.getCartItemById(cartItemId);
        if (cartItemById) {
            throw new ApiError('Item already in cart', 400);
        }
        return await cartRepository.addToCart(cartItem);
    }
    async increaseCartItemQuantity(cartItemId, quentity) {
        const cartItem = await cartRepository.increaseCartItemQuantity(cartItemId, quentity);
        if (!cartItem) {
            throw new ApiError('Cart item not found', 404);
        }
        return cartItem;
    }
    async removeCartItem(itemId) {
        return await cartRepository.removeCartItem(itemId);
    }
    async clearCart() {
        return await cartRepository.clearCart();
    }
}
export const cartService = new CartService();
