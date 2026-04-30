import { UserRole } from "../../modules/user/emum/user.enum";


declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: UserRole;
      };
    }
  }
}

export{}