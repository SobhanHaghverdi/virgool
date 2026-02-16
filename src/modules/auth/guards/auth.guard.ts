import { type Request } from "express";
import { isJWT } from "class-validator";
import AuthService from "../auth.service";
import { AuthMessage } from "../auth.message";

import {
  Injectable,
  CanActivate,
  UnauthorizedException,
  type ExecutionContext,
} from "@nestjs/common";

@Injectable()
class AuthGuard implements CanActivate {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();

    const { authorization = undefined } = request.headers;

    if (!authorization?.trim()) {
      throw new UnauthorizedException(AuthMessage.Unauthorized);
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer?.trim()?.toLowerCase() !== "bearer" || !token || !isJWT(token)) {
      throw new UnauthorizedException(AuthMessage.Unauthorized);
    }

    request.user = await this.authService.verifyAccessToken(token);
    return true;
  }
}

export default AuthGuard;
