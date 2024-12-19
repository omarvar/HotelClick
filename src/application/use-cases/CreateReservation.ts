import { IReservationRepository } from "../../domain/repositories/IReservationRepository";
import { Reservation } from "../../domain/entities/Reservation";

export class CreateReservation {
  constructor(private reservationRepository: IReservationRepository) {}

  async execute(
    id: string,
    customerName: string,
    roomNumber: number,
    checkInDate: Date,
    checkOutDate: Date
  ): Promise<Reservation> {
    const reservation = new Reservation(
      id,
      customerName,
      roomNumber,
      checkInDate,
      checkOutDate
    );
    return this.reservationRepository.create(reservation);
  }
}
