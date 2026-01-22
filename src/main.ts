import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";
import { configureSwagger } from "./config/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
