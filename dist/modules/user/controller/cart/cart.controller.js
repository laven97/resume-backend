import { cartService } from '../../service/cart/cart.service.js';
class CartController {
    async getCart(req, res, next) {
        try {
            const resulte = await cartService.getCart();
            res.status(200).json(resulte);
        }
        catch (err) {
            next(err);
        }
    }
    async addToCart(req, res, next) {
        try {
            const { productId, quantity } = req.body;
            const result = await cartService.addToCart(productId, quantity);
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
            const result = await cartService.increaseCartItemQuantity(parfumeId, quantity);
            res.status(200).json(result);
        }
        catch (err) {
            next(err);
        }
    }
    async removeCartItem(req, res, next) {
        try {
            const { itemId } = req.params;
            await cartService.removeCartItem(itemId);
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }
    async clearCart(req, res, next) {
        try {
            await cartService.clearCart();
            res.sendStatus(204);
        }
        catch (err) {
            next(err);
        }
    }
}
export const cartController = new CartController();
