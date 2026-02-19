import { ApiBearerAuth } from "@nestjs/swagger";
import { ApiHeader } from "../enums/header.enum";
import AuthGuard from "src/modules/auth/guards/auth.guard";
import { applyDecorators, UseGuards } from "@nestjs/common";

function ApiAuth() {
  return applyDecorators(
    UseGuards(AuthGuard),
    ApiBearerAuth(ApiHeader.Authorization),
  );
}

export default ApiAuth;
