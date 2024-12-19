import { IReservationRepository } from "../../domain/repositories/IReservationRepository";

export class DeleteReservation {
  constructor(private reservationRepository: IReservationRepository) {}

  async execute(id: string): Promise<void> {
    await this.reservationRepository.delete(id);
  }
}
