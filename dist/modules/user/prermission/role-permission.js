"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolePermissions = void 0;
const userRole_enum_1 = require("../enum/userRole.enum");
const permision_type_1 = require("../types/permision.type");
exports.rolePermissions = {
    [userRole_enum_1.UserRole.ADMIN]: [
        permision_type_1.Permissions.CREATE_PARFUME,
        permision_type_1.Permissions.UPDATE_PARFUME,
        permision_type_1.Permissions.DELETE_PARFUME,
        permision_type_1.Permissions.READ_PARFUME,
    ],
    [userRole_enum_1.UserRole.USER]: [permision_type_1.Permissions.READ_PARFUME],
    [userRole_enum_1.UserRole.GUEST]: [permision_type_1.Permissions.READ_PARFUME],
    [userRole_enum_1.UserRole.MODERATOR]: [
        permision_type_1.Permissions.CREATE_PARFUME,
        permision_type_1.Permissions.UPDATE_PARFUME,
        permision_type_1.Permissions.READ_PARFUME,
    ],
    [userRole_enum_1.UserRole.SUPER_ADMIN]: [
        permision_type_1.Permissions.CREATE_PARFUME,
        permision_type_1.Permissions.UPDATE_PARFUME,
        permision_type_1.Permissions.DELETE_PARFUME,
        permision_type_1.Permissions.READ_PARFUME,
    ],
};
