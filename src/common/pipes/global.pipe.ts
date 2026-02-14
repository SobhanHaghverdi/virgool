import { BadRequestException, ValidationPipe } from "@nestjs/common";

const validationPipe = new ValidationPipe({
  transform: true,
  exceptionFactory: (errors) => {
    const error = Object.values(errors[0].constraints ?? {})?.[0];
    return new BadRequestException(error);
  },
});

const globalPipes = [validationPipe];

export default globalPipes;
