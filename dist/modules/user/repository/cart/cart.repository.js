"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRepository = void 0;
const cart_model_1 = require("../../models/cart/cart.model");
class CartRepository {
    async getCart() {
        return await cart_model_1.Cart.find();
    }
    async addToCart(cartItem) {
        const newCartItem = new cart_model_1.Cart(cartItem);
        return await newCartItem.save();
    }
    async getCartItemById(cartItemId) {
        return await cart_model_1.Cart.findById(cartItemId);
    }
    async increaseCartItemQuantity(cartItemId, quentity) {
        const cartItem = await cart_model_1.Cart.findById(cartItemId);
        if (!cartItem)
            return null;
        cartItem.quantity += quentity;
        return await cartItem.save();
    }
    async removeCartItem(itemId) {
        await cart_model_1.Cart.findByIdAndDelete(itemId);
    }
    async clearCart() {
        await cart_model_1.Cart.deleteMany();
    }
}
exports.cartRepository = new CartRepository();
