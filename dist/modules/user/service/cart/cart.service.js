"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartService = void 0;
const api_error_1 = require("../../../../common/errors/api-error");
const cart_repository_1 = require("../../repository/cart/cart.repository");
class CartService {
    async getCart() {
        return await cart_repository_1.cartRepository.getCart();
    }
    async addToCart(cartItem, cartItemId) {
        const cartItemById = await cart_repository_1.cartRepository.getCartItemById(cartItemId);
        if (cartItemById) {
            throw new api_error_1.ApiError('Item already in cart', 400);
        }
        return await cart_repository_1.cartRepository.addToCart(cartItem);
    }
    async increaseCartItemQuantity(cartItemId, quentity) {
        const cartItem = await cart_repository_1.cartRepository.increaseCartItemQuantity(cartItemId, quentity);
        if (!cartItem) {
            throw new api_error_1.ApiError('Cart item not found', 404);
        }
        return cartItem;
    }
    async removeCartItem(itemId) {
        return await cart_repository_1.cartRepository.removeCartItem(itemId);
    }
    async clearCart() {
        return await cart_repository_1.cartRepository.clearCart();
    }
}
exports.cartService = new CartService();
