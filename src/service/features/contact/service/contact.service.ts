import { Injectable } from '@nestjs/common';
import { initializeApp, getApp, getApps } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import {
  SendMessageRequest,
  SendMessageResponse,
} from '../../../../_proto/contact';

@Injectable()
export class ContactService {
  private db: Firestore;

  constructor() {
    // Firebase Admin SDKの初期化（既に初期化されていない場合）
    if (getApps().length === 0) {
      initializeApp();
    }

    // Firestoreの初期化
    this.db = getFirestore(getApp());
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
