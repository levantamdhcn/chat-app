import { ObjectId, Schema } from "mongoose"

export interface IConversation {
    _id: string;
    name: string,
    messages: string[];
    members: string[];
}

export interface IConversationMember {
    userId: string;
    conversationId: string;
    leftTime: Date;
    active: boolean;
}