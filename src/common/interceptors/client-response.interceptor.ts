import { map } from "rxjs/operators";
import { type Observable } from "rxjs";
import { type Response } from "express";
import type { ClientResponse } from "../types/client-response.type";

import {
  Injectable,
  NestInterceptor,
  type CallHandler,
  type ExecutionContext,
} from "@nestjs/common";

@Injectable()
class ClientResponseInterceptor<T> implements NestInterceptor<
  T,
  ClientResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ClientResponse<T>> {
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

export default ClientResponseInterceptor;
