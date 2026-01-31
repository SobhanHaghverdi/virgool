import { Request } from "express";
import { isJWT } from "class-validator";

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import AuthService from "../auth.service";

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

    if (!authorization?.trim()) throw new UnauthorizedException("Please login");
    const [bearer, token] = authorization.split(" ");

    if (bearer?.trim()?.toLowerCase() !== "bearer" || !token || !isJWT(token)) {
      throw new UnauthorizedException("Please login");
    }

    request.user = await this.authService.validateAccessToken(token);
    return true;
  }
}

export default AuthGuard;
