import { Reservation } from "../entities/Reservation";

export interface IReservationRepository {
  create(reservation: Reservation): Promise<Reservation>;
  findById(id: string): Promise<Reservation | null>;
  findAll(): Promise<Reservation[]>;
  update(reservation: Reservation): Promise<Reservation>;
  delete(id: string): Promise<void>;
}
