import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationController } from './reservation/reservation.controller';
import { ReservationModule } from './reservation/reservation.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
    }),
    ReservationModule,
    MongooseModule.forRoot(
      'mongodb+srv://Geroppa:Geroppa1210@cluster0.k68p5ks.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController, ReservationController],
  providers: [AppService],
})
export class AppModule {}
