import AuthService from "./auth.service";
import { AuthDto, VerifyOtpDto } from "./dto/auth.dto";
import { Post, Body, Controller } from "@nestjs/common";
import ResponseBuilder from "src/common/utils/response-builder";
import { ApiTags, ApiOperation, ApiOkResponse } from "@nestjs/swagger";

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
  @ApiOperation({ summary: AuthSwaggerOperationMessage.Authentication })
  @ApiOkResponse({ description: AuthSwaggerResponseMessage.SendOtp })
  public async authenticate(@Body() dto: AuthDto) {
    const user = await this.authService.authenticate(dto);
    return ResponseBuilder.ok(user.id, AuthMessage.SendOtp);
  }

  @Post("verify-otp")
  @ApiOperation({ summary: AuthSwaggerOperationMessage.OtpVerification })
  @ApiOkResponse({ description: AuthSwaggerResponseMessage.Login })
  public async verifyOtp(@Body() dto: VerifyOtpDto) {
    const token = await this.authService.verifyOtp(dto);
    return ResponseBuilder.ok(token, AuthMessage.Login);
  }
}

export default AuthController;
