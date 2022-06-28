import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import hashPassword from "../utils/hashPassword";
import checkPassword from "../utils/checkPassword";
import generateAccessToken from "../utils/generateAccessToken";

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email } = req.body;
  const password = hashPassword(req.body.password);
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstName,
    lastName,
    email,
    password,
  });
  return user
    .save()
    .then((user) => res.status(201).json({ user }))
    .catch((error) => res.status(500).json({ error }));
};
const loginUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return User.findOne({ email }).then((user) => {
    if (user) {
      const validPassword = checkPassword(user, password);
      if (validPassword) {
        const token = generateAccessToken(email);
        return res.status(201).json({ token });
      } else {
        return res.status(400).json({ message: "Wrong password!" });
      }
    } else {
      return res.status(400).json({ message: "User is not found!" });
    }
  });
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findById(userId)
    .then((user) => {
      if (user) {
        req.body.password = hashPassword(req.body.password);
        user.set(req.body);
        return user
          .save()
          .then((user) => res.status(201).json({ user }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findByIdAndDelete(userId)
    .then((user) =>
      user
        ? res.status(201).json({ user, message: "Deleted" })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const getUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;

  return User.findById(userId)
    .then((user) =>
      user ? res.status(201) : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const getUserList = (req: Request, res: Response, next: NextFunction) => {
  return User.find()
    .then((users) => res.status(200).json({ users }))
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createUser,
  deleteUser,
  loginUser,
  updateUser,
  getUser,
  getUserList,
};
