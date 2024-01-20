import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  SendMessageRequest,
  SendMessageResponse,
} from '../../../../_proto/contact';
import { ContactService } from './contact.service';

@Controller()
export class MessageService {
  constructor(private readonly contactService: ContactService) {}

  @GrpcMethod()
  async sendMessage(data: SendMessageRequest): Promise<SendMessageResponse> {
    try {
      // Firestoreにメッセージを保存
      const { messageId, success } = await this.contactService.createMessage({
        chatRoomId: data.chatRoomId,
        content: data.content,
        senderId: data.senderId,
        date: data.date,
      });

      // 成功した場合
      return {
        messageId: messageId,
        success: success,
        errorMessage: '',
      };
    } catch (error) {
      // エラーが発生した場合
      console.error('Error sending message:', error);
      return {
        messageId: '',
        success: false,
        errorMessage: error.message,
      };
    }
  }
}
