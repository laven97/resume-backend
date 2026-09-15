import { ApiError } from "../../errors/api-error.js";
import { rolePermissions } from "../../../modules/user/prermission/role-permission.js";
import { UserRole } from "../../../modules/user/enum/userRole.enum.js";
export const checkAccess = (requiredPermission) => {
    return (req, res, next) => {
        try {
            const user = req.user;
            if (!user) {
                throw new ApiError("User not found", 401);
            }
            if (user.role === UserRole.ADMIN) {
                return next();
            }
            const userPermission = rolePermissions[user.role] || [];
            if (!userPermission.includes(requiredPermission)) {
                throw new ApiError("Forbidden", 403);
            }
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
