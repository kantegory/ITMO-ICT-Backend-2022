import mongoose, { Document, Schema } from "mongoose";

export interface IBooking {
  guest: string;
  hotel: string;
  checkIn: string;
  checkOut: string;
}

export interface IBookingModel extends IBooking, Document {}

const BookingSchema: Schema = new Schema(
  {
    guest: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    hotel: { type: Schema.Types.ObjectId, required: true, ref: "Hotel" },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<IBookingModel>("Booking", BookingSchema);
