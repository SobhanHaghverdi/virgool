import AuthService from "./auth.service";
import { AuthDto, VerifyOtpDto } from "./dto/auth.dto";
import { Post, Body, Controller } from "@nestjs/common";
import { ApiOperation, ApiOkResponse } from "@nestjs/swagger";
import ResponseBuilder from "src/common/utils/response-builder";
import type { ApiResponse } from "src/common/types/client-response.type";

import {
  AuthMessage,
  AuthSwaggerResponseMessage,
  AuthSwaggerOperationMessage,
} from "./auth.message";

@Controller("auth")
class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post("authenticate")
  @ApiOkResponse({ description: AuthSwaggerResponseMessage.SendOtp })
  @ApiOperation({ summary: AuthSwaggerOperationMessage.Authentication })
  public async authenticate(@Body() dto: AuthDto): ApiResponse<number> {
    const user = await this.authService.authenticate(dto);
    return ResponseBuilder.ok(user.id, AuthMessage.SendOtp);
  }

  @Post("verify-otp")
  @ApiOkResponse({ description: AuthSwaggerResponseMessage.Login })
  @ApiOperation({ summary: AuthSwaggerOperationMessage.OtpVerification })
  public async verifyOtp(@Body() dto: VerifyOtpDto): ApiResponse<string> {
    const token = await this.authService.verifyOtp(dto);
    return ResponseBuilder.ok(token, AuthMessage.Login);
  }
}

export default AuthController;
