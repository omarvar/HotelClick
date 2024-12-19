import { Reservation } from "../../domain/entities/Reservation";
import { IReservationRepository } from "../../domain/repositories/IReservationRepository";

export class InMemoryReservationRepository implements IReservationRepository {
  private reservations: Reservation[] = [];

  async create(reservation: Reservation): Promise<Reservation> {
    this.reservations.push(reservation);
    return reservation;
  }

  async findById(id: string): Promise<Reservation | null> {
    return (
      this.reservations.find((reservation) => reservation.id === id) || null
    );
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservations;
  }

  async update(reservation: Reservation): Promise<Reservation> {
    const index = this.reservations.findIndex((r) => r.id === reservation.id);
    if (index === -1) throw new Error("Reservation not found");
    this.reservations[index] = reservation;
    return reservation;
  }

  async delete(id: string): Promise<void> {
    this.reservations = this.reservations.filter(
      (reservation) => reservation.id !== id
    );
  }
}
