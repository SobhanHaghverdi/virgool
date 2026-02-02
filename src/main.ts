import cookieParser from "cookie-parser";
import { NestFactory } from "@nestjs/core";
import AppModule from "./modules/app/app.module";
import configureSwagger from "./config/swagger.config";
import { BadRequestException, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { PORT, COOKIE_SECRET_KEY } = process.env;
  app.use(cookieParser(COOKIE_SECRET_KEY));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (errors) => {
        const error = Object.values(errors[0].constraints ?? {})?.[0];
        return new BadRequestException(error);
      },
    }),
  );

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
