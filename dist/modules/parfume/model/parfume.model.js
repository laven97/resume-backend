import { model, Schema } from 'mongoose';
const parfumeSchema = new Schema({
    id: { type: String, requered: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
});
export const Parfume = model('parfume', parfumeSchema);
