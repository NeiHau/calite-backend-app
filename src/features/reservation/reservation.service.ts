import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { MenuInput, ReservationDto } from './graphql/reservation-dto';
import { Model } from 'mongoose';
import {
  Reservation,
  ReservationDocument,
} from 'src/schema/reservation.schema';
import { firebaseApp } from 'src/main';
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}

  private db = getFirestore(firebaseApp);

  private reservations: ReservationDto[] = [];

  getReservations(): ReservationDto[] {
    return this.reservations;
  }

  getReservationById(id: string): Promise<ReservationDto> {
    return this.reservationModel.findById(id).exec();
  }

  async createReservation(
    customerName: string,
    gender: string,
    age: number,
    menu: MenuInput,
  ): Promise<Reservation> {
    const reservation: ReservationDto = {
      id: uuidv4(),
      customerName: customerName,
      gender: gender,
      age: age,
      menu: menu,
    };

    // MongoDB
    const createdReservation = new this.reservationModel(reservation);
    await createdReservation.save();

    // Firestore
    await setDoc(doc(this.db, 'reservations', reservation.id), reservation);

    return createdReservation;
  }
}
