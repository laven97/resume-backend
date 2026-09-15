"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAccess = void 0;
const api_error_1 = require("../../errors/api-error");
const role_permission_1 = require("../../../modules/user/prermission/role-permission");
const userRole_enum_1 = require("../../../modules/user/enum/userRole.enum");
const checkAccess = (requiredPermission) => {
    return (req, res, next) => {
        try {
            const user = req.user;
            if (!user) {
                throw new api_error_1.ApiError("User not found", 401);
            }
            if (user.role === userRole_enum_1.UserRole.ADMIN) {
                return next();
            }
            const userPermission = role_permission_1.rolePermissions[user.role] || [];
            if (!userPermission.includes(requiredPermission)) {
                throw new api_error_1.ApiError("Forbidden", 403);
            }
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
exports.checkAccess = checkAccess;
