import UserService from "./user.service";
import { Controller } from "@nestjs/common";

@Controller("users")
class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }
}

export default UserController;
