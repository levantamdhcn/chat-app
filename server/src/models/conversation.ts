import mongoose, { Schema } from "mongoose";
import { IConversation } from "../interfaces/conversation";

const conversationSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
  }
  ],
  members: [
    {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
  ]
}, { timestamps: true });

const Conversation = mongoose.model<IConversation>("Conversation", conversationSchema);

export default Conversation;