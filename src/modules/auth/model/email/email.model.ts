import { model, Schema } from "mongoose";

import { IEmail } from "../../interface/email/email.interface.js";

const EmailSchema = new Schema({
  email: { type: String, required: true },
});

export const Email = model<IEmail>("email", EmailSchema);
