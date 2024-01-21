import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { ContactService } from './contact.service';
import { SendMessageRequest, SendMessageResponse } from 'src/_proto/contact';
import { Observable, catchError, from, map } from 'rxjs';

@Controller()
export class MessageService {
  constructor(private readonly contactService: ContactService) {}

  @GrpcMethod('MessageService', 'sendMessage')
  sendMessage(data: SendMessageRequest): Observable<SendMessageResponse> {
    return from(this.contactService.createMessage(data)).pipe(
      map(response => ({
        messageId: response.messageId,
        content: response.content,
        senderId: response.senderId,
        chatRoomId: response.chatRoomId,
        success: response.success,
        errorMessage: response.errorMessage ?? '',
      })),
      catchError(error => {
        console.error('Error sending message:', error);
        return from([
          {
            messageId: '',
            content: '',
            senderId: '',
            chatRoomId: '',
            success: false,
            errorMessage: error.message,
          },
        ]);
      }),
    );
  }
}
