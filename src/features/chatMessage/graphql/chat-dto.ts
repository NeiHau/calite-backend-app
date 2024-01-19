/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@ObjectType()
export class User {
  @Field(type => ID)
  id: string;

  @Prop({ required: true })
  @Field()
  name: string;
}

@Schema()
@ObjectType()
export class messageDto {
  @Field(type => ID)
  id: string;

  @Prop({ required: true })
  @Field()
  text: string;

  @Prop({ required: true })
  @Field()
  sender: User;

  @Field()
  createdAt: Date;
}

@InputType()
export class SendMessageInput {
  @Field()
  chatRoomId: string;

  @Field()
  text: string;

  @Field()
  senderId: string;
}
