import { IMessage } from "../../../types/message";

export type TConversation = {
  _id: string;
  name: string,
  members: IConversationMember[];
  messages: IMessage[];
}


export interface IConversationMember {
  userId: string;
  conversationId: string;
  leftTime: Date;
  active: boolean;
}

export interface IConversationState {
  currentConversation: TConversation | null;
  conversations: TConversation[];
  isSending: boolean,
  isSuccess: boolean,
  isError: boolean,
  errorMessage: string,
}