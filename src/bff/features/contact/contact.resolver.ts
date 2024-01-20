/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ContactDto } from './contact.dto';
import { GrpcClientService } from './contact.grpc.client';

@Resolver(of => ContactDto)
export class ContactResolver {
  constructor(private readonly grpcClient: GrpcClientService) {}

  @Mutation(() => ContactDto)
  async sendMessage(
    @Args('content') content: string,
    @Args('senderId') senderId: string,
    @Args('chatRoomId') chatRoomId: string,
    @Args('date') date: number,
  ) {
    return this.grpcClient.sendMessage({
      content: content,
      senderId: senderId,
      chatRoomId: chatRoomId,
      date: date,
    });
  }
}
