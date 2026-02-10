import { map } from "rxjs/operators";
import { type Observable } from "rxjs";
import { type Response } from "express";
import type { ApiResponse } from "../types/api-response.type";

import {
  Injectable,
  CallHandler,
  NestInterceptor,
  ExecutionContext,
} from "@nestjs/common";

@Injectable()
class ApiResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    const response: Response = ctx.getResponse();

    return next.handle().pipe(
      map((data) => {
        const statusCode = data?.statusCode;

        if (statusCode && statusCode !== 200) {
          response.status(statusCode);
        }

        return {
          statusCode: response.statusCode,
          timestamp: new Date().toISOString(),
          ...data,
        };
      }),
    );
  }
}

export default ApiResponseInterceptor;
