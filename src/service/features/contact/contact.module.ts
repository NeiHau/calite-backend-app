import { Module } from '@nestjs/common';
import FirebaseService from 'src/service/firebase/firebase-service';
import { ContactService } from './service/contact.service';
import { MessageService } from './service/contact.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    // GrpcClientModule,
    ClientsModule.register([
      {
        name: 'MESSAGE_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'contact',
          protoPath: join(
            '/Users/uchidakaito/Downloads/nest-js-app/calite-salon-backend/dist/_proto/contact.proto',
          ), // protoファイルのパス
          url: 'localhost:5002',
        },
      },
    ]),
  ],
  controllers: [MessageService],
  providers: [FirebaseService, ContactService],
  exports: [ContactService, ClientsModule],
})
export class ContactModule {}
