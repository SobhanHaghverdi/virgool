import type { BaseClientResponse } from "../types/client-response.type";

class ResponseBuilder {
  static ok<T>(data: T, message?: string): BaseClientResponse<T> {
    return this.create(data, message || "دریافت اطلاعات با موفقیت انجام شد");
  }

  static created<T>(data: T, message: string): BaseClientResponse<T> {
    return this.create(data, message, 201);
  }

  static updated<T>(data: T, message: string): BaseClientResponse<T> {
    return this.create(data, message);
  }

  static deleted<T = null>(): BaseClientResponse<T> {
    return this.create(null as T, "حذف با موفقیت انجام شد", 204);
  }

  static message(
    message: string,
    statusCode: number = 200,
  ): BaseClientResponse<null> {
    return {
      message,
      statusCode,
      data: null,
    };
  }

  private static create<T>(
    data: T,
    message?: string,
    statusCode: number = 200,
  ): BaseClientResponse<T> {
    return {
      data,
      statusCode,
      message: message || "عملیات با موفقیت انجام شد",
    };
  }
}

export default ResponseBuilder;
