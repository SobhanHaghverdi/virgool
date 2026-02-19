enum HttpResponse {
  Success = "success",
  Created = "created",
  NotFound = "notFound",
  Conflict = "conflict",
  Forbidden = "forbidden",
  NoContent = "noContent",
  BadRequest = "badRequest",
  Unauthorized = "unauthorized",
  ValidationError = "validationError",
  TooManyRequests = "tooManyRequests",
}

export { HttpResponse };
