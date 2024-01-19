import { Injectable } from '@nestjs/common';
import { initializeApp, getApp, getApps } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

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

  async createMessage(messageData: {
    chatRoomId: string;
    content: string;
    senderId: string;
    date: number;
  }): Promise<{ messageId: string; success: boolean }> {
    try {
      const dateValue =
        typeof messageData.date === 'number'
          ? messageData.date
          : Number(messageData.date);

      const docRef = this.db
        .collection('messages')
        .doc(messageData.chatRoomId)
        .collection('messages')
        .doc();
      await docRef.set({
        content: messageData.content,
        senderId: messageData.senderId,
        date: dateValue,
      });

      return { messageId: docRef.id, success: true };
    } catch (error) {
      console.error('Error saving message:', error);
      throw error;
    }
  }
}
