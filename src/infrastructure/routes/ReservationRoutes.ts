import { Router } from "express";
import {
  createReservationSchema,
  updateReservationSchema,
} from "../validation/reservationValidation";
import { ReservationController } from "../controllers/ReservationController";
import { validationMiddleware } from "../middlewares/validationMiddleware";

const router = Router();

router.post(
  "/reservations",
  validationMiddleware(createReservationSchema),
  ReservationController.create
);

router.put(
  "/reservations/:id",
  validationMiddleware(updateReservationSchema),
  ReservationController.update
);

router.get("/reservations", ReservationController.getAll);
router.get("/reservations/:id", ReservationController.getById);
router.delete("/reservations/:id", ReservationController.delete);

export default router;
