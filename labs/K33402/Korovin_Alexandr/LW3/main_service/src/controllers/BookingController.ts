import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Booking from "../models/Booking";

const createBooking = (req: Request, res: Response, next: NextFunction) => {
  const { guest, hotel, checkIn, checkOut } = req.body;
  const booking = new Booking({
    _id: new mongoose.Types.ObjectId(),
    guest,
    hotel,
    checkIn,
    checkOut,
  });
  return booking
    .save()
    .then((booking) => res.status(201).json({ booking }))
    .catch((error) => res.status(500).json({ error }));
};

const updateBooking = (req: Request, res: Response, next: NextFunction) => {
  const bookingId = req.params.bookingId;

  return Booking.findById(bookingId)
    .then((booking) => {
      if (booking) {
        booking.set(req.body);
        return booking
          .save()
          .then((booking) => res.status(201).json({ booking }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteBooking = (req: Request, res: Response, next: NextFunction) => {
  const bookingId = req.params.bookingId;

  return Booking.findByIdAndDelete(bookingId)
    .then((booking) =>
      booking
        ? res.status(201).json({ booking, message: "Deleted" })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const getBooking = (req: Request, res: Response, next: NextFunction) => {
  const bookingId = req.params.bookingId;

  return Booking.findById(bookingId)
    .then((booking) =>
      booking ? res.status(201) : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const getBookingList = (req: Request, res: Response, next: NextFunction) => {
  return Booking.find()
    .then((bookings) => res.status(200).json({ bookings }))
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createBooking,
  deleteBooking,
  updateBooking,
  getBooking,
  getBookingList,
};
