import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { errorHandlerMiddleware } from "./infrastructure/middlewares/errorHandlerMiddleware";
import { loggerMiddleware } from "./infrastructure/middlewares/loggerMiddleware";
import ReservationRoutes from "./infrastructure/routes/ReservationRoutes";
import { Database } from "./infrastructure/database/Database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use("/api", ReservationRoutes);

app.use(errorHandlerMiddleware);

const startServer = async () => {
  try {
    const db = Database.getInstance();
    const mongoUri = process.env.MONGO_URI || "";
    await db.connect(mongoUri);

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();
