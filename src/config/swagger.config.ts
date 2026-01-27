import type { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SecuritySchemeObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export function configureSwagger(app: INestApplication): void {
  const document = new DocumentBuilder()
    .setTitle("Virgool")
    .setVersion("0.0.1")
    .setOpenAPIVersion("3.1.0")
    .setDescription("Backend of virgool website")
    .setContact(
      "Sobhan Haghverdi",
      "https://github.com/SobhanHaghverdi",
      "sobhanhv.dev@gmail.com",
    )
    .addBearerAuth(swaggerAuthConfig(), "Authorization")
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, document);

  SwaggerModule.setup("/docs", app, swaggerDocument, {
    customSiteTitle: "Virgool Swagger UI",
  });
}

export function swaggerAuthConfig(): SecuritySchemeObject {
  return { type: "http", bearerFormat: "JWT", in: "header", scheme: "bearer" };
}
