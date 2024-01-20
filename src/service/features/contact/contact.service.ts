import { Injectable } from '@nestjs/common';
import { Firestore } from 'firebase-admin/firestore';
import { SendMessageRequest, SendMessageResponse } from 'src/_proto/contact';
import FirebaseService from 'src/service/firebase/firebase-service';

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
      const { chatRoomId, content, senderId, date } = messageData;
      const dateValue = typeof date === 'number' ? date : Number(date);

      const docRef = this.db
        .collection('messages')
        .doc(chatRoomId)
        .collection('messages')
        .doc();
      await docRef.set({
        content: content,
        senderId: senderId,
        date: dateValue,
      });

      const response: SendMessageResponse = {
        messageId: docRef.id,
        success: true,
        errorMessage: '',
      };
      return response;
    } catch (error) {
      console.error('Error saving message:', error);
      const response: SendMessageResponse = {
        messageId: '',
        success: false,
        errorMessage: error.message,
      };
      return response;
    }
  }
}
