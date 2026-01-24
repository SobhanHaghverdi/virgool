import { AuthDto } from "./dto/auth.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
class AuthService {
  checkUserExistence(dto: AuthDto) {
    return dto;
  }
}

export default AuthService;
