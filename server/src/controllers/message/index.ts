import { Types } from "mongoose";
import Conversation from "../../models/conversation";
import { Body, Get, Inject, Post } from "tsoa";
import ConversationMember from "../../models/conversationMember";
import { IMessage } from "src/interfaces/message";
import Message from "../../models/message";

class MessageController {
  constructor() { }
  @Post("/")
  public async create(@Body() data: IMessage) {
    if(!data.conversationId) {
      throw new Error("Conversation is required!");
    }
    const newMessage = new Message(data);
    try {
      const savedMessage = await newMessage.save();
      return savedMessage;
    } catch (error) {
      throw new Error(`${error instanceof Error ? error.message : error}`);
    }
  };

  @Get("{conversationId}")
  public async getMessageByConversation(@Inject() conversationId: string) {
    try {
      if(!conversationId) {
        throw new Error("Conversation is required.");
      }
      const messages = await Message.find({ conversationId });

      return messages;
    } catch (error) {
      throw new Error(`${error instanceof Error ? error.message : error}`);
    }
  };
};

export = new MessageController();