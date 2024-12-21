import { IReservationRepository } from "../../domain/repositories/IReservationRepository";
import { Reservation } from "../../domain/entities/Reservation";
import mongoose, { Schema, Document, Model } from "mongoose";

interface ReservationDocument extends Document {
  id: string;
  customerName: string;
  roomNumber: number;
  checkInDate: Date;
  checkOutDate: Date;
}

const ReservationSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  roomNumber: { type: Number, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
});

const ReservationModel: Model<ReservationDocument> =
  mongoose.model<ReservationDocument>("Reservation", ReservationSchema);

export class MongoReservationRepository implements IReservationRepository {
  async create(reservation: Reservation): Promise<Reservation> {
    const createdReservation = new ReservationModel(reservation);
    await createdReservation.save();
    return reservation;
  }

  async findById(id: string): Promise<Reservation | null> {
    const reservation = await ReservationModel.findOne({ id }).exec();
    return reservation
      ? new Reservation(
          reservation.id,
          reservation.customerName,
          reservation.roomNumber,
          reservation.checkInDate,
          reservation.checkOutDate
        )
      : null;
  }

  async findAll(): Promise<Reservation[]> {
    const reservations = await ReservationModel.find().exec();
    return reservations.map(
      (r) =>
        new Reservation(
          r.id,
          r.customerName,
          r.roomNumber,
          r.checkInDate,
          r.checkOutDate
        )
    );
  }

  async update(reservation: Reservation): Promise<Reservation> {
    const updatedReservation = await ReservationModel.findOneAndUpdate(
      { id: reservation.id },
      reservation,
      { new: true }
    ).exec();

    if (!updatedReservation) throw new Error("Reservation not found");

    return new Reservation(
      updatedReservation.id,
      updatedReservation.customerName,
      updatedReservation.roomNumber,
      updatedReservation.checkInDate,
      updatedReservation.checkOutDate
    );
  }

  async delete(id: string): Promise<void> {
    const result = await ReservationModel.deleteOne({ id }).exec();
    if (result.deletedCount === 0) throw new Error("Reservation not found");
  }
}
