import { IMessage } from "../../../types/message";
import { IUser } from "../../../types/user";

export type TConversation = {
  _id: string;
  name: string,
  members: ExtendedConversationMember[];
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}


export interface IConversationMember {
  userId: string;
  conversationId: string;
  leftTime: Date;
  active: boolean;
}

type ExtendedConversationMember = IConversationMember & IUser;
export interface IConversationState {
  currentConversation: TConversation | null;
  conversations: TConversation[];
  isFetching: boolean,
  isError: boolean,
  isSuccess: boolean,
  errorMessage: string,
  isMsgSending: boolean,
  isMsgSendSuccess: boolean,
  isMsgSendError: boolean,
}