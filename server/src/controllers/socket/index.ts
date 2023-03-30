import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

import { ErrorEnum } from "../../interfaces/ErrorHandler";
import { IMessageSend } from "../../interfaces/message";
import { verifyAccessToken } from "../../middlewares/auth";
import ISocket, { SocketEventsEnum } from "../../interfaces/socket";
import CONVERSATION from "../../models/conversation";
import MESSAGE from "../../models/message";

var onlineUsers: Map<any, any> = new Map<any, any>();
export class ChatSocket implements ISocket {

  handleConnection(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): void {
    console.log("Socket connected!");

    socket.on(SocketEventsEnum.DISCONNECT, async () => {
      onlineUsers.forEach((el: any) => {
        if (el === socket.id) {
          delete global[el as keyof Global];
        }
      })
    });

    socket.on(SocketEventsEnum.MSG_SEND, async (data) => {
      try {
        const messageData: IMessageSend = JSON.parse(data);
        const chatData = {
          sender: socket.data.userId,
          conversationId: messageData.conversationId,
        }

        const conversation = CONVERSATION.findOne({ _id: chatData.conversationId });
        if (!conversation) throw new Error("Conversation not found");

        const newMsg = new MESSAGE(messageData);
        const savedMsg = await newMsg.save();

        const conversationSocketId = onlineUsers.get('conversationId');
        if (conversationSocketId) {
          socket.to(conversationSocketId).emit(SocketEventsEnum.MSG_RECEIVE, savedMsg);
        };
      } catch (error) {
        socket.emit(SocketEventsEnum.ERROR, error instanceof Error ? error.message : error);
        console.error(error);
      }
    })

    socket.on(SocketEventsEnum.MSG_SEND_FILE, async (data) => {
      try {
        const messageData: IMessageSend = JSON.parse(data);
        const chatData = {
          sender: socket.data.userId,
          conversationId: messageData.conversationId,
        }

        const conversation = CONVERSATION.findOne({ _id: chatData.conversationId });
        if (!conversation) throw new Error("Conversation not found");

        const newMsg = new MESSAGE(messageData);
        const savedMsg = await newMsg.save();

        const conversationSocketId = onlineUsers.get(chatData.conversationId);
        if (conversationSocketId) {
          socket.to(conversationSocketId).emit(SocketEventsEnum.MSG_RECEIVE, savedMsg);
        };
      } catch (error) {
        socket.emit(SocketEventsEnum.ERROR, error instanceof Error ? error.message : error);
        console.error(error);
      }
    })
  }

  async middlewareImplementation(socket: Socket, next: (arg0?: Error) => void) {
    try {
      if (!socket.handshake.headers.authorization) return next(new Error(ErrorEnum.authorization));

      const userData = await verifyAccessToken(socket.handshake.headers.authorization);

      if (!userData) return next(new Error(ErrorEnum.unauthorized));

      onlineUsers.set('userId', userData.id);
      onlineUsers.set('conversationId', socket.id);
      socket.data.userId = userData.id;

      next();

    } catch (error: any) {
      console.error(error);
      return next(error instanceof Error ? error.message : error);
    }
  }
}

export default ChatSocket;