import { UserRole } from "../enum/userRole.enum.js";
import { Permissions } from "../types/permision.type.js";
export const rolePermissions = {
    [UserRole.ADMIN]: [
        Permissions.CREATE_PARFUME,
        Permissions.UPDATE_PARFUME,
        Permissions.DELETE_PARFUME,
        Permissions.READ_PARFUME,
    ],
    [UserRole.USER]: [Permissions.READ_PARFUME],
    [UserRole.GUEST]: [Permissions.READ_PARFUME],
    [UserRole.MODERATOR]: [
        Permissions.CREATE_PARFUME,
        Permissions.UPDATE_PARFUME,
        Permissions.READ_PARFUME,
    ],
    [UserRole.SUPER_ADMIN]: [
        Permissions.CREATE_PARFUME,
        Permissions.UPDATE_PARFUME,
        Permissions.DELETE_PARFUME,
        Permissions.READ_PARFUME,
    ],
};
