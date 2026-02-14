import { App } from "../common/enums/app.enum";
import type { INestApplication } from "@nestjs/common";
import { ApiHeader } from "src/common/enums/header.enum";
import SwaggerConsume from "src/common/enums/swagger-consume.enum";

import type {
  OpenAPIObject,
  RequestBodyObject,
  SecuritySchemeObject,
} from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

import {
  SwaggerModule,
  DocumentBuilder,
  type ApiResponseOptions,
} from "@nestjs/swagger";

//* Swagger options
const bearerAuthOptions: SecuritySchemeObject = {
  in: "header",
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
  description: "Using bearer token auth to pass guarded routes",
};

const globalResponses: ApiResponseOptions[] = [
  { status: 401, description: "Unauthorized" },
  { status: 403, description: "Forbidden" },
  { status: 422, description: "Invalid data" },
  { status: 500, description: "Server error" },
];

function configureSwagger(app: INestApplication): void {
  const document = new DocumentBuilder()
    .setTitle("Virgool")
    .setVersion(App.Version)
    .setOpenAPIVersion("3.1.0")
    .addGlobalResponse(...globalResponses)
    .setDescription("Backend of virgool website")
    .addBearerAuth(bearerAuthOptions, ApiHeader.Authorization)
    .setContact(
      "Sobhan Haghverdi",
      "https://github.com/SobhanHaghverdi",
      "sobhanhv.dev@gmail.com",
    )
    .build();

  let swaggerDocument = SwaggerModule.createDocument(app, document);
  swaggerDocument = addGlobalConsumes(swaggerDocument);

  SwaggerModule.setup("docs", app, swaggerDocument, {
    raw: ["json"],
    customSiteTitle: "Virgool Swagger UI",
  });
}

function addGlobalConsumes(document: OpenAPIObject): OpenAPIObject {
  const paths = document.paths;

  Object.keys(paths).forEach((path) => {
    const methods = paths[path];

    Object.keys(methods)
      .filter((method) => method !== "get")
      .forEach((method) => {
        const operation: RequestBodyObject = methods[method].requestBody;

        if (operation?.content) {
          const schema = Object.values(operation.content)[0].schema;

          operation.content[SwaggerConsume.UrlEncoded] = { schema };
          operation.content[SwaggerConsume.Json] = { schema };
        }
      });
  });

  return document;
}

export default configureSwagger;
