import Joi from "joi";

export const createReservationSchema = Joi.object({
  id: Joi.string().required(),
  customerName: Joi.string().min(3).max(100).required(),
  roomNumber: Joi.number().integer().positive().required(),
  checkInDate: Joi.date().iso().required(),
  checkOutDate: Joi.date().iso().greater(Joi.ref("checkInDate")).required(),
});

export const updateReservationSchema = Joi.object({
  customerName: Joi.string().min(3).max(100).optional(),
  roomNumber: Joi.number().integer().positive().optional(),
  checkInDate: Joi.date().iso().optional(),
  checkOutDate: Joi.date().iso().greater(Joi.ref("checkInDate")).optional(),
});
