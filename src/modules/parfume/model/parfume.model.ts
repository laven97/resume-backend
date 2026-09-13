import { model, Schema } from 'mongoose';

import { IParfume } from '../interface/parfume.interface';

const parfumeSchema = new Schema({
  id: { type: String, requered: true },
  name: { type: String, required: true },
  title: { type: String, required: true },
  // description: { type: String, required: true },
  // atmosphere: { type: String, required: true },
  // longevity: { type: String, required: true },
  // topNotes: { type: String, required: true },
  // heartNotes: { type: String, required: true },
  // baseNotes: { type: String, required: true },
  // stock : {type:Bollean,requered:true}
  price: { type: Number, required: true },
});

export const Parfume = model<IParfume>('parfume', parfumeSchema);
