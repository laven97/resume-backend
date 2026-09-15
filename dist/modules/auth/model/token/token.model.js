import { model, Schema } from 'mongoose';
const TokenSchema = new Schema({
    refreshToken: { type: String, required: true },
    id: { type: Schema.Types.ObjectId, ref: 'User' },
});
export const Token = model('token', TokenSchema);
