import Conversation from "../../models/conversation";
import { Body, Get, Path, Post, Route } from "tsoa";
import ConversationMember from "../../models/conversationMember";
import { IContact } from "src/interfaces/contact";
import Contact from "src/models/contact";

@Route('contact')
class ContactController {
  constructor() { }
  @Post("/")
  public async create(@Body() data: string[]): Promise<IContact> {
    try {
      const newContact = new Contact({
        members: data,
      });

      const newConversation = new Conversation({
        members: newContact.members
      });

      const savedConversation = await newConversation.save();

      const createNewMember = savedConversation.members.map(m => (async() => {
        const newSenderMember = new ConversationMember({
          userId: m,
          conversationId: savedConversation._id,
          leftTime: null,
          active: true,
        });
  
        await newSenderMember.save();
      })());

      await Promise.all(createNewMember);

      return newContact;
    } catch (error) {
      throw new Error(`${error instanceof Error ? error.message : error}`);
    }
  };
};

export = new ContactController();