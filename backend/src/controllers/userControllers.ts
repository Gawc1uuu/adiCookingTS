import { Request, Response } from "express";
import User from "../models/userModel";

const loginUser = async (req: Request, res: Response) => {
  res.status(200).json({ msg: "login user" });
};

const signupUser = async (req: Request, res: Response) => {
  res.status(200).json({ msg: "signup user" });
};

export { loginUser, signupUser };
