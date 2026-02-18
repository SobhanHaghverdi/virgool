import { applyDecorators } from "@nestjs/common";
import { HttpResponse } from "../enums/http.enum";
import type { MessageStructure } from "../types/api-endpoint.type";

import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiTooManyRequestsResponse,
  ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";

function ApiMessage(messageStructure: MessageStructure) {
  const decorators: MethodDecorator[] = [];

  if (messageStructure.summary) {
    decorators.push(ApiOperation({ summary: messageStructure.summary }));
  }

  if (!messageStructure.responses) {
    return applyDecorators(...decorators);
  }

  const responses = messageStructure.responses;

  Object.entries(responses).forEach(([status, description]) => {
    switch (status) {
      case HttpResponse.Success:
        decorators.push(ApiOkResponse({ description }));
        break;

      case HttpResponse.Created:
        decorators.push(ApiCreatedResponse({ description }));
        break;

      case HttpResponse.NoContent:
        decorators.push(ApiNoContentResponse({ description }));
        break;

      case HttpResponse.BadRequest:
        decorators.push(ApiBadRequestResponse({ description }));
        break;

      case HttpResponse.Unauthorized:
        decorators.push(ApiUnauthorizedResponse({ description }));
        break;

      case HttpResponse.Forbidden:
        decorators.push(ApiForbiddenResponse({ description }));
        break;

      case HttpResponse.NotFound:
        decorators.push(ApiNotFoundResponse({ description }));
        break;

      case HttpResponse.Conflict:
        decorators.push(ApiConflictResponse({ description }));
        break;

      case HttpResponse.ValidationError:
        decorators.push(ApiUnprocessableEntityResponse({ description }));
        break;

      case HttpResponse.TooManyRequests:
        decorators.push(ApiTooManyRequestsResponse({ description }));
        break;
    }
  });

  return applyDecorators(...decorators);
}

export default ApiMessage;
