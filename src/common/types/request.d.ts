import type { AccessTokenPayload } from "src/modules/auth/types/auth.type";

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload;
    }
  }
}
