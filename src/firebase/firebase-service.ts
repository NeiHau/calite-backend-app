import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import serviceAccount from '../../firebase-service-account.json';

@Injectable()
export default class FirebaseService {
  private firebaseApp: firebaseAdmin.app.App;

  constructor() {
    if (firebaseAdmin.apps.length === 0) {
      this.firebaseApp = firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(
          serviceAccount as ServiceAccount,
        ),
      });
    }
  }

  getAuth(): firebaseAdmin.auth.Auth {
    return this.firebaseApp.auth();
  }

  getFirestore(): firebaseAdmin.firestore.Firestore {
    return this.firebaseApp.firestore();
  }

  // Realtime Databaseへの参照を返すメソッド
  getRealtimeDB(): firebaseAdmin.database.Database {
    return this.firebaseApp.database();
  }
}
