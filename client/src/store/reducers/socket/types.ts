import { IMessage } from "../../../types/message";

export interface ISocketState {
    onlineUsers: string[];
    messages: IMessage[];
    typingUsers: string[];
}