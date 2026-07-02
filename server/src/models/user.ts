import mongoose from "mongoose";
import validator from "validator";
import { CreatedUser, IUser, roles, status } from "../interfaces/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";

// Put all user instance methods in this interface:
export interface IUserMethods {
  validPassword(password: string): Promise<any>;
}

// Create a new Model type that knows about IUserMethods...
type UserModel = mongoose.Model<CreatedUser, {}, IUserMethods>;

const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
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
  status: {
    type: String,
    default: status.inactive,
    enum: status,
  },
  role: {
    type: String,
    default: "user",
    enum: roles,
  },
  confirmationCode: { 
    type: String, 
    unique: true 
  },
  reset_password_token: {
    type: String,
  }
}, { timestamps: true });

// Don't expose password and other variables via API endpoints
userSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret, opt) => {
    delete ret["confirmationCode"];
    delete ret["password"];
    delete ret["id"];
    delete ret["__v"];
    return ret;
  },
});

// Before saving new user, hash the password with salt
userSchema.pre("save", function (next) {
  // Hash the password with a salt
  const hash = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  this.password = hash;
  next();
});

// Checks if password is valid
userSchema.methods.validPassword = async function (password: string) {
  return await bcrypt.compare(password.toString(), this.password);
};

const User = mongoose.model<CreatedUser, UserModel>("User", userSchema);

export default User;