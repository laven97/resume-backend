import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../errors/api-error";
import { Permissions } from "../../../modules/user/types/permision.type";
import { rolePermissions } from "../../../modules/user/prermisiions/role-permission";

class RoleState {
  public can(permission: Permissions) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.user) {
          throw new ApiError("Not authenticated", 401);
        }

        const permissions = rolePermissions[req.user.role] || [];

        if (!permissions.includes(permission)) {
          throw new ApiError("Forbidden", 403);
        }

        next();
      } catch (err) {
        next(err);
      }
    };
  }
}

export const roleState = new RoleState();
