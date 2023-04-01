import { Body, Get, Inject, Path, Post, Route } from "tsoa";
import { IMessage } from "../../interfaces/message";
import Message from "../../models/message";

@Route('message')
class MessageController {
  constructor() { }
  @Post("/")
  public async create(@Body() data: IMessage): Promise<IMessage> {
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
  public async getMessageByConversation(@Path() conversationId: string) {
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