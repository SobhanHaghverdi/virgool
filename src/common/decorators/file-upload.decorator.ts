import type { FileFormat } from "../enums/file.enum";
import { multerStorage } from "../utils/multer.util";
import { applyDecorators, UseInterceptors } from "@nestjs/common";
import type { MulterField } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

import {
  FileInterceptor,
  FileFieldsInterceptor,
} from "@nestjs/platform-express";

function MultipleFileUpload(
  fieldName: string,
  uploadFields: MulterField[],
  allowedFormats: FileFormat[],
) {
  return applyDecorators(
    UseInterceptors(
      FileFieldsInterceptor(uploadFields, {
        storage: multerStorage(fieldName, allowedFormats),
      }),
    ),
  );
}

function FileUpload(
  fieldName: string,
  uploadField: string,
  allowedFormats: FileFormat[],
) {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(uploadField, {
        storage: multerStorage(fieldName, allowedFormats),
      }),
    ),
  );
}

export { MultipleFileUpload, FileUpload };
