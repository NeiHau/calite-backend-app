import { Module } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { JwtModule } from '@nestjs/jwt';
import AuthService from './auth-service';
import AuthResolver from './graphql/auth-resolver';
import FirebaseService from 'src/service/firebase/firebase-service';

const secretKey = randomBytes(32).toString('hex');

@Module({
  imports: [
    JwtModule.register({
      secret: secretKey,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, AuthResolver, FirebaseService],
  exports: [AuthService, FirebaseService],
})
export class FirebaseAuthModule {}
