import { NextFunction, Request, Response } from "express";

import { Permissions } from "../../../modules/user/types/permision.type.js";
import { ApiError } from "../../errors/api-error.js";
import { rolePermissions } from "../../../modules/user/prermission/role-permission.js";
import { ITokenPayload } from "../../../modules/auth/interface/token/token.interface.js";
import { UserRole } from "../../../modules/user/enum/userRole.enum.js";

interface RequestWithUser extends Request {
  user?: ITokenPayload;
}

export const checkAccess = (requiredPermission: Permissions) => {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
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
    } catch (err) {
      next(err);
    }
  };
};
