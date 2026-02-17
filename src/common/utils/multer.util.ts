import { mkdirSync } from "fs";
import { extname, join } from "path";
import type { Request } from "express";
import multer, { diskStorage } from "multer";
import { FileFormat } from "../enums/file.enum";
import { BadRequestException } from "@nestjs/common";

type CallbackFunction = (err: Error | null, destOrFileName: string) => void;

function multerDestination(fieldName: string) {
  return function (
    req: Request,
    file: Express.Multer.File,
    callback: CallbackFunction,
  ) {
    const path = join(process.cwd(), "public", "uploads", fieldName);
    mkdirSync(path, { recursive: true });

    callback(null, path);
  };
}

function multerFileName(allowedFormats: FileFormat[]) {
  return function (
    req: Request,
    file: Express.Multer.File,
    callback: CallbackFunction,
  ) {
    const ext = extname(file.originalname).trim().toLowerCase();

    if (!allowedFormats.includes(ext as FileFormat)) {
      return callback(new BadRequestException("Image format is not valid"), "");
    }

    const fileName = `${Date.now()}${ext}`;
    callback(null, fileName);
  };
}

function multerStorage(
  fieldName: string,
  allowedFormats: FileFormat[],
): multer.StorageEngine {
  return diskStorage({
    filename: multerFileName(allowedFormats),
    destination: multerDestination(fieldName),
  });
}

export { multerDestination, multerFileName, multerStorage };
