import AuthService from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { Post, Body, Controller } from "@nestjs/common";
import SwaggerConsume from "src/common/enums/swagger-consume.enum";

import {
  ApiTags,
  ApiConsumes,
  ApiOperation,
  ApiCreatedResponse,
} from "@nestjs/swagger";

import {
  AuthMessage,
  AuthSwaggerResponseMessage,
  AuthSwaggerOperationMessage,
} from "./auth.message";

@ApiTags("Auth")
@Controller("auth")
class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post("register")
  @ApiConsumes(SwaggerConsume.UrlEncoded, SwaggerConsume.Json)
  @ApiOperation({ summary: AuthSwaggerOperationMessage.Registration })
  @ApiCreatedResponse({ description: AuthSwaggerResponseMessage.Registered })
  public async register(@Body() dto: AuthDto) {
    await this.authService.register(dto);
    return { message: AuthMessage.Registered };
  }
}

export default AuthController;
