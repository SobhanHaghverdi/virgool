import AuthService from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { Post, Body, Controller } from "@nestjs/common";
import SwaggerConsume from "src/common/enums/swagger-consume.enum";

import {
  ApiTags,
  ApiConsumes,
  ApiOperation,
  ApiOkResponse,
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

  @Post("authenticate")
  @ApiConsumes(SwaggerConsume.UrlEncoded, SwaggerConsume.Json)
  @ApiOperation({ summary: AuthSwaggerOperationMessage.Authentication })
  @ApiOkResponse({ description: AuthSwaggerResponseMessage.SendOtp })
  public async authenticate(@Body() dto: AuthDto) {
    await this.authService.authenticate(dto);
    return { message: AuthMessage.SendOtp };
  }
}

export default AuthController;
