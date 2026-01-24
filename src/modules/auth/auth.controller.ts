import AuthService from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Post } from "@nestjs/common";
import SwaggerConsume from "src/common/enums/swagger-consume.enum";

@Controller("auth")
@ApiTags("Auth")
class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post("user-existence")
  @ApiConsumes(SwaggerConsume.Json, SwaggerConsume.UrlEncoded)
  public checkUserExistence(@Body() dto: AuthDto) {
    return this.authService.checkUserExistence(dto);
  }
}

export default AuthController;
