import { Injectable } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import { SendMessageRequest, SendMessageResponse } from 'src/_proto/contact';
import FirebaseService from 'src/service/firebase/firebase-service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ContactService {
  private db: Firestore;

  constructor(
    private firebaseService: FirebaseService, // FirebaseService を注入
  ) {
    this.db = this.firebaseService.getFirestore(); // Firestore インスタンスの取得
  }

  async createMessage(
    messageData: SendMessageRequest,
  ): Promise<SendMessageResponse> {
    try {
      const { messageId, content, senderId, chatRoomId, date } = messageData;
      const dateValue = typeof date === 'number' ? date : Number(date);

      const docRef = this.db
        .collection('messages')
        .doc(chatRoomId)
        .collection('messages')
        .doc();
      await docRef.set({
        messageId: messageId ?? docRef.id,
        content: content,
        senderId: senderId,
        chatRoomId: chatRoomId ?? uuidv4,
        date: dateValue,
        success: true,
      });

      const response: SendMessageResponse = {
        messageId: messageId ?? docRef.id,
        content: content,
        senderId: senderId,
        chatRoomId: chatRoomId,
        success: true,
        errorMessage: '',
      };
      return response;
    } catch (error) {
      console.error('Error saving message:', error);
      return {
        messageId: '',
        content: '',
        senderId: '',
        chatRoomId: '',
        success: false,
        errorMessage: error.message,
      };
    }
  }
}
