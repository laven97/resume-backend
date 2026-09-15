import { model, Schema } from "mongoose";
const EmailSchema = new Schema({
    email: { type: String, required: true },
});
export const Email = model("email", EmailSchema);
