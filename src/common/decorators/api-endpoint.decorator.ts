import { ApiHeader } from "../enums/header.enum";
import AuthGuard from "src/modules/auth/guards/auth.guard";
import { applyDecorators, UseGuards } from "@nestjs/common";
import type { ApiEndpointOptions } from "../types/api-endpoint.type";

import {
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from "@nestjs/swagger";

function ApiEndpoint(options: ApiEndpointOptions) {
  const {
    summary,
    authRequired,
    successMessage,
    createdMessage,
    notFoundMessage,
    noContentMessage,
  } = options;

  const decorators = [ApiOperation({ summary })];

  if (successMessage) {
    decorators.push(ApiOkResponse({ description: successMessage }));
  }

  if (createdMessage) {
    decorators.push(ApiCreatedResponse({ description: createdMessage }));
  }

  if (notFoundMessage) {
    decorators.push(ApiNotFoundResponse({ description: notFoundMessage }));
  }

  if (noContentMessage) {
    decorators.push(ApiNoContentResponse({ description: noContentMessage }));
  }

  if (authRequired) {
    decorators.push(
      UseGuards(AuthGuard),
      ApiBearerAuth(ApiHeader.Authorization),
    );
  }

  return applyDecorators(...decorators);
}

export default ApiEndpoint;
