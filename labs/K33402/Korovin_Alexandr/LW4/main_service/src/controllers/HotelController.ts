import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Hotel from "../models/Hotel";

const createHotel = (req: Request, res: Response, next: NextFunction) => {
  const { title, description, address, guestLimit, price, bookings } = req.body;
  const hotel = new Hotel({
    _id: new mongoose.Types.ObjectId(),
    title,
    description,
    address,
    guestLimit,
    price,
    bookings,
  });
  return hotel
    .save()
    .then((hotel) => res.status(201).json({ hotel }))
    .catch((error) => res.status(500).json({ error }));
};

const updateHotel = (req: Request, res: Response, next: NextFunction) => {
  const hotelId = req.params.hotelId;

  return Hotel.findById(hotelId)
    .then((hotel) => {
      if (hotel) {
        hotel.set(req.body);
        return hotel
          .save()
          .then((hotel) => res.status(201).json({ hotel }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteHotel = (req: Request, res: Response, next: NextFunction) => {
  const hotelId = req.params.hotelId;

  return Hotel.findByIdAndDelete(hotelId)
    .then((hotel) =>
      hotel
        ? res.status(201).json({ hotel, message: "Deleted" })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const getHotel = (req: Request, res: Response, next: NextFunction) => {
  const hotelId = req.params.hotelId;

  return Hotel.findById(hotelId)
    .then((hotel) =>
      hotel ? res.status(201) : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const getHotelList = (req: Request, res: Response, next: NextFunction) => {
  return Hotel.find()
    .then((hotels) => res.status(200).json({ hotels }))
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createHotel,
  deleteHotel,
  updateHotel,
  getHotel,
  getHotelList,
};
