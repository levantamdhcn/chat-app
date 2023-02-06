import { ObjectId, Schema } from "mongoose";

export interface IMessage {
    _id: ObjectId;
    fromUser: Schema.Types.ObjectId;
    toUser: Schema.Types.ObjectId;
    type: string;
    messageText: string;
    conversationId: Schema.Types.ObjectId;
}

export enum ETypes {
    text = "text",
    image = "image",
    audio = "audio",
    video = "video"
}