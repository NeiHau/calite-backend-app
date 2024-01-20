/* eslint-disable @typescript-eslint/no-unused-vars */

// reservation.dto.ts
import { Field, ObjectType, Int, InputType, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
@ObjectType()
export class MenuDto {
  @Prop({ required: true })
  @Field()
  menuName: string;

  @Prop({ required: true })
  @Field(type => Float)
  price: number;

  @Field({ nullable: true })
  description?: string;
}

@Schema()
@ObjectType()
export class ReservationDto {
  @Field()
  id: string;

  @Prop({ required: true })
  @Field()
  customerName: string;

  @Prop({ required: true })
  @Field()
  gender: string;

  @Prop({ required: true })
  @Field(type => Int)
  age: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: MenuDto.name })
  @Field(type => MenuDto)
  menu: MenuDto;
}

@InputType()
export class MenuInput {
  @Field()
  menuName: string;

  @Field(type => Float)
  price: number;

  @Field({ nullable: true })
  description?: string;
}

export const ReservationSchema = SchemaFactory.createForClass(ReservationDto);
