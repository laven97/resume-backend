import { UserRole } from "../emum/user.enum";
import { Permissions } from "../types/permision.type";

export const rolePermissions: Record<UserRole, Permissions[]> = {
  [UserRole.ADMIN]: [
    "parfume:create",
    "parfume:update",
    "parfume:delete",
    "parfume:read",
  ],
  [UserRole.USER]: ["parfume:read"],
  [UserRole.GUEST]: ["parfume:read"],
};
