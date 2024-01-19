import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import FirebaseService from 'src/firebase/firebase-service';

@Injectable()
export default class AuthService {
  constructor(
    private jwtService: JwtService,
    private firebaseService: FirebaseService,
  ) {}

  async validateIdToken(idToken: string): Promise<string> {
    try {
      const decodedToken = await this.firebaseService
        .getAuth()
        .verifyIdToken(idToken);
      const payload = { uid: decodedToken.uid, email: decodedToken.email };
      return this.jwtService.sign(payload);
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }
}
