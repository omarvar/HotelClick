import { IReservationRepository } from "../../domain/repositories/IReservationRepository";
import { Reservation } from "../../domain/entities/Reservation";

export class GetReservationById {
  constructor(private reservationRepository: IReservationRepository) {}

  async execute(id: string): Promise<Reservation | null> {
    return this.reservationRepository.findById(id);
  }
}
