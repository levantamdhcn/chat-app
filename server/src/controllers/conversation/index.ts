import { Types } from "mongoose";
import Conversation from "../../models/conversation";
import { Body, Get, Inject, Post } from "tsoa";
import ConversationMember from "../../models/conversationMember";

type CreatePayload = {
  sender: Types.ObjectId,
  receiver: Types.ObjectId,
}

class ConversationController {
  constructor() { }
  @Post("/")
  public async create(@Body() data: CreatePayload) {
    try {
      const { sender, receiver } = data;
      if (!sender || !receiver) {
        throw new Error("Missing sender or receiver information.");
      };

      const newConversation = new Conversation({
        members: [sender, receiver]
      });

      const savedConversation = await newConversation.save();
      const newSenderMember = new ConversationMember({
        userId: sender,
        conversationId: savedConversation._id,
        leftTime: null,
        active: true,
      });

      await newSenderMember.save();

      const newReceiverMember = new ConversationMember({
        userId: receiver,
        conversationId: savedConversation._id,
        leftTime: null,
        active: true,
      });

      await newReceiverMember.save();

      return {
        conversation: savedConversation,
        sender: newSenderMember,
        receiver: newReceiverMember,
      }
    } catch (error) {
      throw new Error(`${error instanceof Error ? error.message : error}`);
    }
  };

  @Get("{userId}")
  public async getConversationByUser(@Inject() userId: string) {
    try {
      const conversation = await Conversation.find({ members: { $in: [userId] }}).populate({
        path: "members",
        select: [
          "_id",
          "firstName",
          "lastName",
          "avatar",
          "email",
          "status",
          "role"
        ]
      });

      return conversation;
    } catch (error) {
      throw new Error(`${error instanceof Error ? error.message : error}`);
    }
  };

  @Post("{conversationId}")
  public async pushMember(@Body() members: string[], @Inject() conversationId: string) {
    try {
      if (members.length === 0) {
        throw new Error("Members is empty.");
      };
      let updatedConversation = await Conversation.findByIdAndUpdate(conversationId, {
        $push: { members: members }
      });

      let newMembers = members.map(el => (async (el) => {
        await (new ConversationMember({ conversationId: conversationId, leftTime: null, active: true })).save();
      })());

      await Promise.all(newMembers);

      return updatedConversation;
    } catch (error) {
      throw new Error(`${error instanceof Error ? error.message : error}`);
    }
  };
};

export = new ConversationController();