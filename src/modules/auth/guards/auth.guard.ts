import { type Request } from "express";
import { isJWT } from "class-validator";
import { Reflector } from "@nestjs/core";
import AuthService from "../auth.service";
import { AuthMessage } from "../auth.message";
import { SKIP_AUTH_KEY } from "src/common/decorators/skip-auth.decorator";

import {
  Injectable,
  CanActivate,
  UnauthorizedException,
  type ExecutionContext,
} from "@nestjs/common";

@Injectable()
class AuthGuard implements CanActivate {
  private readonly reflector: Reflector;
  private readonly authService: AuthService;

  constructor(authService: AuthService, reflector: Reflector) {
    this.reflector = reflector;
    this.authService = authService;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthSkipped = this.reflector.get<boolean>(
      SKIP_AUTH_KEY,
      context.getHandler(),
    );

    if (isAuthSkipped) return true;

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
