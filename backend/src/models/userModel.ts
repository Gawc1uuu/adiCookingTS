import mongoose, { Schema, model } from "mongoose";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import validator from "validator";

interface IUser {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.login = async function (
  email,
  password
): Promise<IUser | null> {
  if (!email || !password) {
    throw Error("email and password are required");
  }

  if (!validator.isEmail(email)) {
    throw Error("Incorrect email");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("user with that email do not exists");
  }

  const match = await bcrypt.compare(password, user.password);

  if (match) {
    return user;
  } else {
    throw Error("incorrect password");
  }
};

userSchema.statics.signup = async function (email, password): Promise<IUser> {
  if (!email || !password) {
    throw Error("email and password are required");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("User with that email already exists");
  }

  if (!validator.isEmail(email)) {
    throw Error("Incorrect email");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = this.create({ email, password: hash });
  return user;
};

export default model("User", userSchema);
