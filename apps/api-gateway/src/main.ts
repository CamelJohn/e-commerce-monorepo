import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.SERVER_HTTP_PORT ?? 3000, '0.0.0.0', () =>
    console.info(`Server is running on port ${process.env.SERVER_HTTP_PORT}`),
  );
}
bootstrap().catch(console.error);
