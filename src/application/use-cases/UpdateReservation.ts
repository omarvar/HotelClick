import { IReservationRepository } from "../../domain/repositories/IReservationRepository";
import { Reservation } from "../../domain/entities/Reservation";

export class UpdateReservation {
  constructor(private reservationRepository: IReservationRepository) {}

  async execute(reservation: Reservation): Promise<Reservation> {
    return this.reservationRepository.update(reservation);
  }
}
