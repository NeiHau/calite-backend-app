import { Module } from '@nestjs/common';
import { GrpcClientService } from './contact.grpc.client';
import { ContactResolver } from './contact.resolver';
import { ContactModule } from 'src/service/features/contact/contact.module';
import { WebsocketModule } from 'src/service/websocket/websocket.module';

@Module({
  imports: [ContactModule, WebsocketModule],
  providers: [GrpcClientService, ContactResolver],
  exports: [GrpcClientService, ContactResolver],
})
export class ContactBffModule {}
