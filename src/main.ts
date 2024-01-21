import { NestFactory } from '@nestjs/core';
import { AppModule } from './service/features/app/app.module';
import { initializeApp } from 'firebase/app';
import * as dotenv from 'dotenv';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'contact',
      protoPath: join(
        '/Users/uchidakaito/Downloads/nest-js-app/calite-salon-backend/dist/_proto/contact.proto',
      ),
      url: '0.0.0.0:5002',
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  await app.startAllMicroservices();
  await app.listen(5001); // サーバーの起動
}
bootstrap();
