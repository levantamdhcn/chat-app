import { Schema } from "mongoose";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
  isEmailVerified: boolean;
  role: string;
  reset_password_token: string
}

export enum roles {
  user = "user",
  admin = "admin"
}


export interface CreatedUser extends IUser {
  _id: Schema.Types.ObjectId;
}
