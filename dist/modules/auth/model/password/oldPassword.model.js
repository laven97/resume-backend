import { model, Schema } from "mongoose";
const OldPasswordSchema = new Schema({
    password: { type: String, required: true, trim: true },
    _userId: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false,
});
export const OldPassword = model("oldPassword", OldPasswordSchema);
