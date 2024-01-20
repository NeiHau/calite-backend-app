import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema()
export class Menu {
  @Prop()
  menuName: string;

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
  customerName: string;

  @Prop()
  gender: string;

  @Prop()
  age: number;

  @Prop()
  menu: Menu;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
