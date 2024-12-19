import { IReservationRepository } from "../../domain/repositories/IReservationRepository";
import { Reservation } from "../../domain/entities/Reservation";

export class GetAllReservations {
  constructor(private reservationRepository: IReservationRepository) {}

  async execute(): Promise<Reservation[]> {
    return this.reservationRepository.findAll();
  }
}
