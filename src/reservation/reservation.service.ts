import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { MenuInput, ReservationDto } from './graphql/reservation-dto';
import { Model } from 'mongoose';
import {
  Reservation,
  ReservationDocument,
} from 'src/schema/reservation.schema';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}

  private reservations: ReservationDto[] = [];

  getReservations(): ReservationDto[] {
    return this.reservations;
  }

  getReservationById(id: string): Promise<ReservationDto> {
    return this.reservationModel.findById(id).exec();
  }

  createReservation(
    name: string,
    gender: string,
    age: number,
    menu: MenuInput,
  ): Promise<Reservation> {
    const reservation: ReservationDto = {
      id: uuidv4(),
      name: name,
      gender: gender,
      age: age,
      menu: menu,
    };

    const createdReservation = new this.reservationModel(reservation);
    return createdReservation.save();
  }
}
