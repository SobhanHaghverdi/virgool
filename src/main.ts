import { NestFactory } from "@nestjs/core";
import AppModule from "./modules/app/app.module";
import { configureSwagger } from "./config/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureSwagger(app);
  const { PORT } = process.env;

  await app.listen(PORT, () => {
    console.log(`Server is running or http://localhost:${PORT}`);
    console.log(`Swagger UI is running or http://localhost:${PORT}/docs`);
  });
}
bootstrap();
