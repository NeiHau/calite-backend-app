import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContactDto {
  @Field()
  messageId: string;

  @Field()
  content: string;

  @Field()
  senderId: string;

  @Field()
  chatRoomId: string;

  @Field()
  date: number;
}

@ObjectType()
export class ContactResponse {
  @Field()
  messageId: string;

  @Field()
  content: string;

  @Field()
  senderId: string;

  @Field()
  chatRoomId: string;

  // @Field()
  // success: boolean;

  // @Field()
  // errorMessage: string;
}

@InputType()
export class ContactInput {
  @Field()
  content: string;

  @Field()
  senderId: string;

  @Field()
  chatRoomId: string;

  @Field()
  date: number;
}

@ObjectType()
export class MessageSubscription {
  @Field()
  messageId: string;

  @Field()
  content: string;

  @Field()
  senderId: string;

  @Field()
  chatRoomId: string;

  @Field()
  date: number;
}
