import { Request, Response } from "express";
import { MongoReservationRepository } from "../persistence/MongoReservationRepository";
import { CreateReservation } from "../../application/use-cases/CreateReservation";
import { GetReservationById } from "../../application/use-cases/GetReservationById";
import { GetAllReservations } from "../../application/use-cases/GetAllReservations";
import { UpdateReservation } from "../../application/use-cases/UpdateReservation";
import { DeleteReservation } from "../../application/use-cases/DeleteReservation";
import { Reservation } from "../../domain/entities/Reservation";

const reservationRepository = new MongoReservationRepository();
const createReservation = new CreateReservation(reservationRepository);
const getReservationById = new GetReservationById(reservationRepository);
const getAllReservations = new GetAllReservations(reservationRepository);
const updateReservation = new UpdateReservation(reservationRepository);
const deleteReservation = new DeleteReservation(reservationRepository);

export class ReservationController {
  static async create(req: Request, res: Response) {
    const { id, customerName, roomNumber, checkInDate, checkOutDate } =
      req.body;
    try {
      const reservation = await createReservation.execute(
        id,
        customerName,
        roomNumber,
        new Date(checkInDate),
        new Date(checkOutDate)
      );
      res.status(201).json(reservation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const reservation = await getReservationById.execute(id);
      if (!reservation) {
        res.status(404).json({ error: "Reservation not found" });
      } else {
        res.status(200).json(reservation);
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const reservations = await getAllReservations.execute();
      res.status(200).json(reservations);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { customerName, roomNumber, checkInDate, checkOutDate } = req.body;
    try {
      const reservation = await updateReservation.execute(
        new Reservation(
          id,
          customerName,
          roomNumber,
          new Date(checkInDate),
          new Date(checkOutDate)
        )
      );
      res.status(200).json(reservation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await deleteReservation.execute(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
