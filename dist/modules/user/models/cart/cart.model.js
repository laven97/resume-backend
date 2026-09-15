import { model, Schema } from 'mongoose';
const CartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    parfume: { type: Schema.Types.ObjectId, ref: 'Parfume', required: true },
    quantity: { type: Number, required: true, default: 1 },
});
export const Cart = model('Cart', CartSchema);
