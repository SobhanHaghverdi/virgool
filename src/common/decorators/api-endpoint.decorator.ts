import { ApiHeader } from "../enums/header.enum";
import { applyDecorators } from "@nestjs/common";
import { AuthMessage } from "src/modules/auth/auth.message";
import type { ApiEndpointOptions } from "../types/api-endpoint.type";

import {
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiUnauthorizedResponse,
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
      ApiBearerAuth(ApiHeader.Authorization),
      ApiUnauthorizedResponse({ description: AuthMessage.Unauthorized }),
    );
  }

  return applyDecorators(...decorators);
}

export default ApiEndpoint;
