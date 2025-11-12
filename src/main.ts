import { NestFactory } from '@nestjs/core';
import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    exceptionFactory: (errors) => new BadRequestException(errors.map((err) => Object.values(err.constraints ?? {})).flat())
  }));
  const port = +(process.env.PORT ?? 3000);
  const host = process.env.HOST ?? '127.0.0.1';
  const listenDisabled = process.env.DISABLE_HTTP_LISTEN === 'true';

  if (listenDisabled) {
    logger.warn('HTTP listener disabled via DISABLE_HTTP_LISTEN=true; initializing app without binding a port.');
    await app.init();
    await new Promise(() => {});
    return;
  }

  try {
    await app.listen(port, host);
  } catch (error) {
    const errno = (error as NodeJS.ErrnoException)?.code;
    if (errno === 'EPERM' || errno === 'EADDRINUSE') {
      logger.warn(
        `Port binding blocked (${errno}). Continuing without HTTP listener. Set DISABLE_HTTP_LISTEN=true to skip binding altogether.`
      );
      await app.init();
      await new Promise(() => {});
      return;
    }
    throw error;
  }
}
bootstrap();
