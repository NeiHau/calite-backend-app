import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationService } from './reservation.service';
import { ReservationResolver } from './graphql/reservation-resolver';
import { Reservation, ReservationSchema } from 'src/schema/reservation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservation.name, schema: ReservationSchema },
    ]),
  ],
  providers: [ReservationService, ReservationResolver],
  exports: [ReservationService, ReservationResolver],
})
export class ReservationModule {}
