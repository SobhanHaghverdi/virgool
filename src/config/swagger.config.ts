import type { INestApplication } from "@nestjs/common";
import { ApiHeader } from "src/common/enums/header.enum";
import type { SecuritySchemeObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

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
    .setVersion("0.0.1")
    .setOpenAPIVersion("3.1.0")
    .addGlobalResponse(...globalResponses)
    .setDescription("Backend of virgool website")
    .addBearerAuth(bearerAuthOptions, ApiHeader.AUTHORIZATION)
    .setContact(
      "Sobhan Haghverdi",
      "https://github.com/SobhanHaghverdi",
      "sobhanhv.dev@gmail.com",
    )
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, document);

  SwaggerModule.setup("docs", app, swaggerDocument, {
    raw: ["json"],
    customSiteTitle: "Virgool Swagger UI",
  });
}

export default configureSwagger;
