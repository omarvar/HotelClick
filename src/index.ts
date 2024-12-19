import express from "express";
import cors from "cors";
import { errorHandlerMiddleware } from "./infrastructure/middlewares/errorHandlerMiddleware";
import { loggerMiddleware } from "./infrastructure/middlewares/loggerMiddleware";
import ReservationRoutes from "./infrastructure/routes/reservationRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use("/api", ReservationRoutes);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
