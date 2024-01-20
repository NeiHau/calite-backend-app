import { Module } from '@nestjs/common';
import { GrpcClientService } from './contact.grpc.client';
import { ContactResolver } from './contact.resolver';
import { ContactModule } from 'src/service/features/contact/contact.module';

@Module({
  imports: [ContactModule],
  providers: [GrpcClientService, ContactResolver],
  exports: [GrpcClientService, ContactResolver],
})
export class ContactBffModule {}
