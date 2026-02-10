import type { ApiResponse } from "../types/api-response.type";

class ResponseBuilder {
  static ok<T>(data: T, message?: string): ApiResponse<T> {
    return this.create(data, message || "دریافت اطلاعات با موفقیت انجام شد");
  }

  static created<T>(data: T, message?: string): ApiResponse<T> {
    return this.create(data, message || "ایجاد با موفقیت انجام شد", 201);
  }

  static updated<T>(data: T, message?: string): ApiResponse<T> {
    return this.create(data, message || "ویرایش با موفقیت انجام شد");
  }

  static deleted<T = null>(message?: string): ApiResponse<T> {
    return this.create(null as T, message || "حذف با موفقیت انجام شد", 204);
  }

  static message(message: string, statusCode: number = 200): ApiResponse<null> {
    return {
      data: null,
      message,
      statusCode,
      timestamp: new Date().toISOString(),
    };
  }

  private static create<T>(
    data: T,
    message?: string,
    statusCode: number = 200,
  ): ApiResponse<T> {
    return {
      data,
      statusCode,
      timestamp: new Date().toISOString(),
      message: message || "عملیات با موفقیت انجام شد",
    };
  }
}

export default ResponseBuilder;
