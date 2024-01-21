/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import {
  ContactDto,
  ContactResponse,
  MessageSubscription,
} from './contact.dto';
import { GrpcClientService } from './contact.grpc.client';
import { Redis } from 'ioredis';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { Gateway } from 'src/service/websocket/websocket.gateway';
import { firstValueFrom } from 'rxjs';

const pubSub = new PubSub();

@Resolver(of => ContactDto)
export class ContactResolver {
  constructor(
    private readonly grpcClient: GrpcClientService,
    @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
    private readonly gateway: Gateway,
  ) {}

  @Mutation(() => ContactDto)
  async sendMessage(
    @Args('messageId') messageId: string,
    @Args('content') content: string,
    @Args('senderId') senderId: string,
    @Args('chatRoomId') chatRoomId: string,
    @Args('date') date: number,
  ) {
    try {
      const observableResult = this.grpcClient.sendMessage({
        messageId: messageId,
        content: content,
        senderId: senderId,
        chatRoomId: chatRoomId,
        date: date,
      });

      // ObservableからPromiseを取得し、その結果を待つ
      const result = await firstValueFrom(observableResult);

      console.log(result);

      await this.redisClient.lpush(
        `chatRoomId:${chatRoomId}`,
        JSON.stringify(result),
      );

      pubSub.publish('newMessage', { newMessage: result });
      this.gateway.broadcastMessage(result);

      return result;
    } catch (e) {
      console.error('Error sending message:', e.message);
      return {
        messageId: '', // 適切な初期値またはエラー値を設定
        content: '',
        senderId: '',
        chatRoomId: '',
        success: false,
        errorMessage: e.message,
      };
    }
  }

  @Subscription(() => ContactResponse)
  newMessage() {
    return pubSub.asyncIterator('newMessage');
  }
}
