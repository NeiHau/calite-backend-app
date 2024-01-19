import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import FirebaseService from 'src/firebase/firebase-service';
import { ContactService } from './contact.service';

@Module({
  controllers: [ContactController],
  providers: [FirebaseService, ContactService],
})
export class ContactModule {}
