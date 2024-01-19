/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { MenuInput, ReservationDto } from './reservation-dto';
import { ReservationService } from '../reservation.service';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

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
    @Args('customerName') customerName: string,
    @Args('gender') gender: string,
    @Args('age') age: number,
    @Args('menu') menu: MenuInput,
  ) {
    const reservation = this.reservationService.createReservation(
      customerName,
      gender,
      age,
      menu,
    );
    pubSub.publish('newReservation', { newReservation: reservation });
    return reservation;
  }

  @Subscription(returns => ReservationDto)
  newReservation() {
    return pubSub.asyncIterator('newReservation');
  }
}
