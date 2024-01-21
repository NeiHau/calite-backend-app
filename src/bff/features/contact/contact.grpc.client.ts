// grpc-client.service.ts
import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  SendMessageRequest,
  SendMessageResponse,
} from '../../../_proto/contact';
import { MessageService } from 'src/service/features/contact/contact.controller';
import { Observable } from 'rxjs';

@Injectable()
export class GrpcClientService implements OnModuleInit {
  private messageService: MessageService;

  constructor(@Inject('MESSAGE_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.messageService =
      this.client.getService<MessageService>('MessageService');
  }

  sendMessage(data: SendMessageRequest): Observable<SendMessageResponse> {
    return this.messageService.sendMessage(data);
  }
}
