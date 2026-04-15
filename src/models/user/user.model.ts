import { model, Schema } from "mongoose";
import { UserRole } from "../../enums/user/user.enum";
import { IUser } from "../../interfaces/user/user.interface";


const userSchema = new Schema(
  {
    userId: { type: String },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, select: false },
    name: { type: String },
    avatar: { type: String },
    role: { type: String, enum: UserRole, default: UserRole.USER },
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
