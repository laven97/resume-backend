import { model, Schema } from "mongoose";
import { IOldPassword } from "../../interface/password/old-password.interface";

const OldPasswordSchema = new Schema(
  {
    password: { type: String, required: true, trim: true },

    _userId: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const OldPassword = model<IOldPassword>(
  "oldPassword",
  OldPasswordSchema
);
