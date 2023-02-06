import mongoose from "mongoose";
import validator from "validator";
import { CreatedUser, IUser, roles } from "../interfaces/user";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema<CreatedUser>({
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

// Don't expose password and other variables via API endpoints
userSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret, opt) => {
    delete ret["password"];
    delete ret["_id"];
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
userSchema.methods.validPassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model<CreatedUser>("User", userSchema);

export default User;