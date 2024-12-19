export class Reservation {
  constructor(
    public id: string,
    public customerName: string,
    public roomNumber: number,
    public checkInDate: Date,
    public checkOutDate: Date
  ) {}
}
