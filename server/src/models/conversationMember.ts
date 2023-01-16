import mongoose, { Schema } from "mongoose";
import { IConversationMember } from "../interfaces/conversation";

const conversationMemberSchema = new mongoose.Schema<IConversationMember>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  conversationId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Conversation",
  },
  leftTime: {
    type: Date,
  },
  active: {
    type: Boolean,
  }
});

const Message = mongoose.model<IConversationMember>("ConversationMember", conversationMemberSchema);

export default Message;