import { NestFactory } from '@nestjs/core';
import { AppModule } from './features/app/app.module';
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

export const firebaseApp = initializeApp(firebaseConfig); // Firebase初期化

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // NestJSアプリケーションの初期化

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'contact',
      protoPath: join(__dirname, '..', './features/contact/contact.proto'),
      url: '0.0.0.0:5002',
    },
  });

  app.enableCors({
    origin: 'http://localhost:3000',
  });

  await app.startAllMicroservices();
  await app.listen(5001); // サーバーの起動
}
bootstrap();
