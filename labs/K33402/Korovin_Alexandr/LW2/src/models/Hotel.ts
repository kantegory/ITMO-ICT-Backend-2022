import mongoose, { Document, Schema } from "mongoose";

export interface IHotel {
  title: string;
  description: string;
  address: string;
  guestLimit: number;
  price: number;
  bookings: string
}

export interface IHotelModel extends IHotel, Document { }

const HotelSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    guestLimit: { type: Number, required: true },
    price: { type: Number, required: true },
    bookings: { type: Schema.Types.ObjectId, required: false, ref: "Booking" },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IHotelModel>("Hotel", HotelSchema);
