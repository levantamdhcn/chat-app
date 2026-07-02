import mongoose, { Schema } from "mongoose";
import { IContact } from "../interfaces/contact";

const contactSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  ]
}, { timestamps: true });

const Contact = mongoose.model<IContact>("Contact", contactSchema);

export default Contact;