import { Schema } from "mongoose"

export interface IConversation {
    name: string,
    members: Schema.Types.ObjectId[];
}

export interface IConversationMember {
    userId: Schema.Types.ObjectId;
    conversationId: Schema.Types.ObjectId;
    leftTime: Date;
    active: boolean;
}