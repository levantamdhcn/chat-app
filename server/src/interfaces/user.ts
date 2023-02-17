import { Schema } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  isEmailVerified: boolean;
  role: string;
  status: string;
  reset_password_token: string;
  confirmationCode: string;
}

export enum roles {
  user = "user",
  admin = "admin"
}

export enum status {
  active = "active",
  inactive = "inactive"
}
export interface CreatedUser extends IUser {
  _id: Schema.Types.ObjectId;
}
