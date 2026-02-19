import { Injectable, NestMiddleware } from "@nestjs/common";
import type { NextFunction, Request, Response } from "express";

@Injectable()
class OmitEmptyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    //* Delete empty values from body
    if (req.body && typeof req.body === "object") {
      req.body = this.cleanObject(req.body);
    }

    next();
  }

  private cleanObject(obj: any): any {
    if (obj === null || obj === undefined) {
      return undefined;
    }

    if (typeof obj !== "object") {
      return typeof obj === "string" ? obj.trim() : obj;
    }

    if (Array.isArray(obj)) {
      return obj
        .map((item) => this.cleanObject(item))
        .filter((item) => !this.isEmpty(item));
    }

    const cleanedObj: any = {};

    for (const [key, value] of Object.entries(obj)) {
      const cleanedValue = this.cleanObject(value);

      if (!this.isEmpty(cleanedValue)) {
        cleanedObj[key] = cleanedValue;
      }
    }

    return cleanedObj;
  }

  private isEmpty(value: any): boolean {
    if (value === null || value === undefined) {
      return true;
    }

    if (typeof value === "string" && value.trim() === "") {
      return true;
    }

    //* Check for empty array
    if (Array.isArray(value) && value.length === 0) {
      return true;
    }

    //* Check for empty object (without any keys)
    if (
      typeof value === "object" &&
      !Array.isArray(value) &&
      Object.keys(value).length === 0
    ) {
      return true;
    }

    return false;
  }
}

export default OmitEmptyMiddleware;
