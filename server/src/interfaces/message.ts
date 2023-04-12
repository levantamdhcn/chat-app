export interface IMessage {
    _id: string;
    fromUser: string;
    toUser: string;
    type: string;
    file: string;
    messageText: string;
    conversationId: string;
}

export type IMessageSend = {
    fromUser: string;
    toUser: string;
    type: string;
    messageText: string;
    file: any;
    conversationId: string;
}

export interface IFileSend {
    fromUser: string;
    toUser: string;
    type: string;
    file: any;
    conversationId: string;
}

export enum ETypes {
    text = "text",
    image = "image",
    audio = "audio",
    video = "video"
}