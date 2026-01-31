import UserService from "./user.service";
import { ApiTags } from "@nestjs/swagger";
import { Controller } from "@nestjs/common";

@Controller("users")
@ApiTags("User")
class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }
}

export default UserController;
