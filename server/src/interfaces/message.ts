import { Schema } from "mongoose";

export interface IMessage {
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