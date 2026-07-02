import Conversation from "../../models/conversation";
import { Body, Delete, Get, Inject, Path, Post, Route } from "tsoa";
import ConversationMember from "../../models/conversationMember";
import { IContact } from "../../interfaces/contact";
import Contact from "../../models/contact";
import User from "../../models/user";
import { CreatedUser } from "../../interfaces/user";

@Route('contact')
class ContactController {
  public populate = {
    path: 'members',
    select: ['_id', 'firstName', 'lastName', 'email', 'role', 'avatar', 'createdAt', 'updatedAt']
  }
  constructor() { }

  @Get("/")
  public async get(): Promise<IContact[] | undefined> {
    const contacts = await Contact.find({}).populate(this.populate);

    if (!contacts) {
      throw new Error("Query error!");
    }

    return contacts;
  }

  @Get("/user/{userId}")
  public async getContactByUser(@Path() userId: string): Promise<IContact[] | undefined> {
    const u = await User.findById(userId);
    if (!u) throw new Error("Invalid user");

    const contacts = await Contact.find({ members: u._id }).populate(this.populate);
    if (!contacts) throw new Error("Invalid contact member");

    return contacts;
  }

  @Get("{contactId}")
  public async getContactById(@Path() contactId: string): Promise<IContact | undefined> {
    if (!contactId) throw new Error("ContactId is required");
    const contact = await Contact.findById(contactId).populate(this.populate);

    if (!contact) throw new Error("ContactId is invalid");

    return contact;
  }

  @Post("/")
  public async create(@Body() data: string, @Inject() user: CreatedUser): Promise<IContact> {
    if (data === user._id) {
      throw new Error(`Assign contact to yourself!`)
    }

    const newContact = new Contact({
      members: [data, user._id],
    });

    if (!newContact) throw new Error(`Create new contact failed!`);
    await newContact.save();

    const newConversation = new Conversation({
      members: newContact.members,
      name: `private_${user._id}_${data}`
    });

    const savedConversation = await newConversation.save();

    const createNewMember = savedConversation.members.map(m => (async () => {
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
  };

  @Delete("{contactId}")
  public async deleteContact(@Path() contactId: string): Promise<IContact | undefined> {
    if (!contactId) throw new Error("ContactId is required");
    const contact = await Contact.findByIdAndDelete(contactId).populate(this.populate);

    if (!contact) throw new Error("ContactId is invalid");

    return contact;
  }
};

export = new ContactController();