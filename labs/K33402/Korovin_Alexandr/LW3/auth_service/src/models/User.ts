import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IUserModel>('User', UserSchema)
