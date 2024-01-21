import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationModule } from '../reservation/reservation.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { FirebaseAuthModule } from '../auth/auth-module';
import { ContactModule } from '../contact/contact.module';
import { ContactBffModule } from 'src/bff/features/contact/contact.bff.module';
import { RedisModule } from 'src/service/microservice/redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import { WebsocketModule } from 'src/service/websocket/websocket.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
    MongooseModule.forRoot(
      'mongodb+srv://Geroppa:Geroppa1210@cluster0.k68p5ks.mongodb.net/?retryWrites=true&w=majority',
    ),
    ConfigModule.forRoot({
      isGlobal: true, // ConfigModuleをグローバルモジュールとして設定
    }),
    ReservationModule,
    FirebaseAuthModule,
    ContactModule,
    ContactBffModule,
    RedisModule,
    WebsocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
