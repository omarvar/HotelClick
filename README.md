# Proyecto de Gestión de Reservas Hoteleras

## Descripción del Proyecto

Este proyecto es una API REST para la gestión de reservas hoteleras. Permite crear, leer, actualizar y eliminar reservas utilizando **Node.js**, **TypeScript**, y **MongoDB**. La arquitectura implementada sigue el diseño orientado al dominio (Domain-Driven Design, **DDD**), lo que asegura una clara separación de responsabilidades y facilita el mantenimiento y escalabilidad del proyecto.

---

## Arquitectura Implementada (DDD)

La arquitectura se organiza en las siguientes capas principales:

### 1. **Domain**

Esta capa contiene la lógica central del negocio y las entidades que representan los conceptos principales del dominio.

- **Entities**: Clases que modelan las entidades del dominio (e.g., `Reservation`).
- **Repositories**: Interfaces para la abstracción de la persistencia de datos (e.g., `IReservationRepository`).

### 2. **Application**

Esta capa contiene los casos de uso que orquestan las operaciones del negocio.

- **Use Cases**: Clases que encapsulan la lógica para cada acción del sistema (e.g., `CreateReservation`, `GetReservationById`).
- **DTOs**: Objetos para transferir datos entre capas.

### 3. **Infrastructure**

Proporciona implementaciones concretas para la persistencia, controladores, rutas y otros aspectos técnicos.

- **Persistence**: Implementaciones de `IReservationRepository` (e.g., `MongoReservationRepository` utiliza MongoDB).
- **Controllers**: Clases que gestionan las solicitudes HTTP (e.g., `ReservationController`).
- **Routes**: Definición de las rutas de la API.
- **Middlewares**: Funciones para manejar aspectos transversales como logs y manejo de errores.

### 4. **Shared**

Contiene utilidades y manejadores de errores compartidos entre las capas.

- **Errors**: Definición de errores personalizados.
- **Utils**: Funciones auxiliares.

---

## Estructura de Carpetas

```
src/
├── application/
│   ├── dtos/
│   └── use-cases/
├── domain/
│   ├── entities/
│   └── repositories/
├── infrastructure/
│   ├── controllers/
│   ├── database/
│   ├── middlewares/
│   ├── persistence/
│   └── routes/
└── shared/
    ├── errors/
    └── utils/
```

---

## Persistencia

Se utiliza **MongoDB** como base de datos para almacenar las reservas. La implementación del repositorio de persistencia se encuentra en `MongoReservationRepository.ts`, que sigue la interfaz definida en la capa de dominio.

Archivo de configuración de la base de datos:

```typescript
// src/infrastructure/database/Database.ts
import mongoose from "mongoose";

export class Database {
  private static instance: Database;

  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async connect(uri: string): Promise<void> {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB");
    } catch (error) {
      console.error("Error disconnecting from MongoDB:", error);
    }
  }
}
```

---

## Variables de Entorno

El proyecto utiliza un archivo `.env` para configurar las variables de entorno necesarias.

### Ejemplo de Archivo `.env`:

```env
MONGO_URI=mongodb://localhost:27017/hotel-reservations
PORT=3000
```

- **MONGO_URI**: URI de conexión a MongoDB.
- **PORT**: Puerto donde se ejecuta la aplicación.

---

## Endpoints del API

### Base URL: `/api`

#### 1. **Crear Reserva**

- **POST** `/reservations`
- **Body** (JSON):

```json
{
  "id": "1",
  "customerName": "John Doe",
  "roomNumber": 101,
  "checkInDate": "2024-12-01",
  "checkOutDate": "2024-12-10"
}
```

#### 2. **Listar Todas las Reservas**

- **GET** `/reservations`

#### 3. **Obtener Reserva por ID**

- **GET** `/reservations/:id`

#### 4. **Actualizar Reserva**

- **PUT** `/reservations/:id`
- **Body** (JSON): Igual al POST.

#### 5. **Eliminar Reserva**

- **DELETE** `/reservations/:id`

---

## Pasos para Ejecutar el Proyecto

1. **Clonar el Repositorio**:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>
   ```

2. **Instalar Dependencias**:

   ```bash
   npm install
   ```

3. **Configurar Variables de Entorno**:
   Crear un archivo `.env` en la raíz con el contenido necesario (ver sección de variables de entorno).

4. **Iniciar MongoDB**:
   Asegúrate de que MongoDB esté en ejecución localmente o usa un servicio en la nube como MongoDB Atlas.

5. **Ejecutar el Servidor**:

   ```bash
   npm start
   ```

6. **Probar la API**:
   Utiliza herramientas como Postman o cURL para interactuar con los endpoints.

---

## Tecnologías Utilizadas

- **Node.js**
- **Express**
- **TypeScript**
- **MongoDB**
- **Mongoose**
- **Cors**
- **Dotenv**

---

## Futuras Mejoras

- Implementación de autenticación y autorización.
- Validación más robusta con librerías como `class-validator`.
- Despliegue en plataformas como AWS o Vercel.

---
