/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MenuInput, ReservationDto } from './reservation-dto';
import { ReservationService } from '../reservation.service';

@Resolver(of => ReservationDto)
export class ReservationResolver {
  constructor(private reservationService: ReservationService) {}

  @Query(returns => [ReservationDto])
  async reservations(): Promise<ReservationDto[]> {
    return this.reservationService.getReservations();
  }

  @Query(returns => ReservationDto)
  async getReservation(@Args('id') id: string): Promise<ReservationDto | null> {
    return this.reservationService.getReservationById(id);
  }

  @Mutation(returns => ReservationDto)
  async createReservation(
    @Args('name') name: string,
    @Args('gender') gender: string,
    @Args('age') age: number,
    @Args('menu') menu: MenuInput,
  ) {
    return this.reservationService.createReservation(name, gender, age, menu);
  }
}
