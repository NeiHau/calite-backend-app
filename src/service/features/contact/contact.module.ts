import { Module } from '@nestjs/common';
import FirebaseService from 'src/service/firebase/firebase-service';

import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { MessageService } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
  imports: [
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
  exports: [FirebaseService, ContactService, ClientsModule],
})
export class ContactModule {}
