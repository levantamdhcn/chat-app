import mongoose from "mongoose";
import validator from "validator";
import { IUser, roles } from "../interfaces/user";

const userSchema = new mongoose.Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value: string) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      };
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 0,
    validate(value: string) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new Error('Password must contain at least one letter and one number');
      }
    },
  },
  role: {
    type: String,
    default: "user",
    enum: roles,
  }
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;