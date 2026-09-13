import { model, Schema } from 'mongoose';
import { ICartParfume } from '../../interface/parfume.interface';

const CartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  parfume: { type: Schema.Types.ObjectId, ref: 'Parfume', required: true },
});

export const Cart = model<ICartParfume>('cart', CartSchema);
