import cookieParser from "cookie-parser";
import { NestFactory } from "@nestjs/core";
import AppModule from "./modules/app/app.module";
import { configureSwagger } from "./config/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { PORT, COOKIE_SECRET_KEY } = process.env;
  app.use(cookieParser(COOKIE_SECRET_KEY));

  configureSwagger(app);

  await app.listen(PORT, () => {
    console.log(`Server is running or http://localhost:${PORT}`);
    console.log(`Swagger UI is running or http://localhost:${PORT}/docs`);
  });
}
bootstrap();
