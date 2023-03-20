import { ObjectId, Schema } from "mongoose"

export interface IConversation {
    _id: ObjectId;
    name: string,
    messages:   Schema.Types.ObjectId[];
    members: Schema.Types.ObjectId[];
}

export interface IConversationMember {
    userId: Schema.Types.ObjectId;
    conversationId: Schema.Types.ObjectId;
    leftTime: Date;
    active: boolean;
}