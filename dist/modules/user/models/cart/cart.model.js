"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const CartSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    parfume: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Parfume', required: true },
    quantity: { type: Number, required: true, default: 1 },
});
exports.Cart = (0, mongoose_1.model)('Cart', CartSchema);
