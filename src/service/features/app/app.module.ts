import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationModule } from '../reservation/reservation.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { FirebaseAuthModule } from '../auth/auth-module';
import { ContactModule } from '../contact/contact.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': {
          path: '/graphql',
        },
      },
    }),
    ReservationModule,
    FirebaseAuthModule,
    ContactModule,
    MongooseModule.forRoot(
      'mongodb+srv://Geroppa:Geroppa1210@cluster0.k68p5ks.mongodb.net/?retryWrites=true&w=majority',
    ),
    // ClientsModule.register([
    //   {
    //     name: 'CONTACT_PACKAGE',
    //     transport: Transport.GRPC,
    //     options: {
    //       package: 'hero',
    //       protoPath: join(__dirname, '..', './features/contact/contact.proto'),
    //     },
    //   },
    // ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
