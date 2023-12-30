import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema()
export class Menu {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  description?: string;
}

@Schema()
export class Reservation {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  gender: string;

  @Prop()
  age: number;

  @Prop()
  menu: Menu;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
