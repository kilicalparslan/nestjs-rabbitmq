import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:password@localhost:5672'],
        queue: 'notification_queue',
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  await app.listen();
}

bootstrap();
