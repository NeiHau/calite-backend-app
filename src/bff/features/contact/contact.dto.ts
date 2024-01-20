import { Field, InputType } from '@nestjs/graphql';

export class ContactDto {
  @Field()
  messageId: string;

  @Field()
  success: boolean;

  @Field()
  errorMessage: string;
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
