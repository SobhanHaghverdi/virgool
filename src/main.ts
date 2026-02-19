import { NestFactory } from "@nestjs/core";
import AppModule from "./modules/app/app.module";
import globalPipes from "./common/pipes/global.pipe";
import configureSwagger from "./config/swagger.config";
import { NestExpressApplication } from "@nestjs/platform-express";
import ClientResponseInterceptor from "./common/interceptors/client-response.interceptor";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const { PORT } = process.env;

  app.useStaticAssets("public");
  app.useGlobalPipes(...globalPipes);
  app.useGlobalInterceptors(new ClientResponseInterceptor());

  configureSwagger(app);

  await app.listen(PORT, () => {
    console.log(`💻 Server is running or http://localhost:${PORT}`);
    console.log(`✅ Swagger UI is running or http://localhost:${PORT}/docs`);

    console.log(
      `📝 Swagger json definition is running or http://localhost:${PORT}/docs-json`,
    );
  });
}
bootstrap();
