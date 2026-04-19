import { model, Schema } from "mongoose";

import { UserRole } from "../emum/user.enum";
import { IUser } from "../interface/user.interface";

const userSchema = new Schema(
  {
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, requered: true },
    avatar: { type: String, required: false },
    role: {
      type: String,
      enum: UserRole,
      default: UserRole.USER,
      required: true,
    },
    phone: { type: String, required: false },
    isVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model<IUser>("user", userSchema);
