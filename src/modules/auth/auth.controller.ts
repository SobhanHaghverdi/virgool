import AuthService from "./auth.service";
import { AuthDto, VerifyOtpDto } from "./dto/auth.dto";
import { Post, Body, Controller } from "@nestjs/common";
import ResponseBuilder from "src/common/utils/response-builder";
import { AuthMessage, AuthSwaggerMessage } from "./auth.message";
import ApiMessage from "src/common/decorators/api-message.decorator";
import type { ApiResponse } from "src/common/types/client-response.type";

@Controller("auth")
class AuthController {
  private readonly authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post("authenticate")
  @ApiMessage(AuthSwaggerMessage.Authenticate)
  async authenticate(@Body() dto: AuthDto): ApiResponse<object> {
    const user = await this.authService.authenticate(dto);
    return ResponseBuilder.ok(user, AuthMessage.SendOtp);
  }

  @Post("verify-otp")
  @ApiMessage(AuthSwaggerMessage.VerifyOtp)
  async verifyOtp(@Body() dto: VerifyOtpDto): ApiResponse<string> {
    const token = await this.authService.verifyOtp(dto);
    return ResponseBuilder.ok(token, AuthMessage.Login);
  }
}

export default AuthController;
