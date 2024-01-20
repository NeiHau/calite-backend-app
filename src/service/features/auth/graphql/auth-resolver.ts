/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import AuthService from '../auth-service';

@Resolver()
export default class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(returns => String)
  async loginWithEmail(@Args('idToken') idToken: string): Promise<string> {
    return this.authService.validateIdToken(idToken);
  }
}
