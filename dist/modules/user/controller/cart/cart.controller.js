"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartController = void 0;
const cart_service_1 = require("../../service/cart/cart.service");
class CartController {
    async getCart(req, res, next) {
        try {
            const resulte = await cart_service_1.cartService.getCart();
            res.status(200).json(resulte);
        }
        catch (err) {
            next(err);
        }
    }
    async addToCart(req, res, next) {
        try {
            const { productId, quantity } = req.body;
            const result = await cart_service_1.cartService.addToCart(productId, quantity);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async increaseCartItemQuantity(req, res, next) {
        try {
            const { parfumeId } = req.params;
            const { quantity } = req.body;
            const result = await cart_service_1.cartService.increaseCartItemQuantity(parfumeId, quantity);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async removeCartItem(req, res, next) {
        try {
            const { itemId } = req.params;
            await cart_service_1.cartService.removeCartItem(itemId);
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }
    async clearCart(req, res, next) {
        try {
            await cart_service_1.cartService.clearCart();
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.cartController = new CartController();
