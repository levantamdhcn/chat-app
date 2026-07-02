import mongoose, { Schema } from "mongoose";
import { ETypes, IMessage } from "../interfaces/message";

const messageSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  fromUser: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  toUser: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  type: {
    type: String,
    enum: ETypes,
    required: true,
    default: "text"
  },
  messageText: {
    type: String,
  },
  conversationId: {
    type: Schema.Types.ObjectId,
  },
}, { timestamps: true });

const Message = mongoose.model<IMessage>("Message", messageSchema);

export default Message;