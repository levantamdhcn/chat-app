export interface IMessage {
  _id: string;
  fromUser: string;
  toUser: string;
  type: string;
  messageText: string;
  conversationId: string;
  createdAt: Date;
}

export enum ETypes {
  text = "text",
  image = "image",
  audio = "audio",
  video = "video"
}