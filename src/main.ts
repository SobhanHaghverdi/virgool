import { NestFactory } from "@nestjs/core";
import AppModule from "./modules/app/app.module";
import globalPipes from "./common/pipes/global.pipe";
import configureSwagger from "./config/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { PORT } = process.env;

  app.useGlobalPipes(...globalPipes);

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
