import User from "../models/userModel";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { MongooseError } from "mongoose";

const createToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.SECRET!, { expiresIn: "1d" });
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const savedUser = await User.login(email, password);

    // create token
    const token = createToken(savedUser._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: (error as MongooseError).message });
  }
};

const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const savedUser = await User.signup(email, password);

    // create token
    const token = createToken(savedUser._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: (error as MongooseError).message });
  }
};

export { loginUser, signupUser };
