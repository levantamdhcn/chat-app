import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { AuthService } from "../../services/auth";

import { ErrorEnum } from "../../interfaces/ErrorHandler";
import { IMessageSend } from "../../interfaces/message";
import ISocket, { SocketEventsEnum } from "../../interfaces/socket";
import CONVERSATION from "../../models/conversation";
import MESSAGE from "../../models/message";

var onlineUsers: Map<any, any> = new Map<any, any>();
export class ChatSocket implements ISocket {

  handleConnection(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): void {
    socket.on(SocketEventsEnum.DISCONNECT, async () => {
      onlineUsers.forEach((el: any) => {
        if (el === socket.id) {
          delete global[el as keyof Global];
        }
      })
    });

    socket.on(SocketEventsEnum.JOIN_ROOM,async ({ content }) => {
      try {
        const { _id: conversationId } = content;
        console.log('conversationId', conversationId);
        const conversation = await CONVERSATION.findById(conversationId);
        console.log('conversation', conversation);

        if(!conversation) {
          socket.emit(SocketEventsEnum.ERROR, {
            message: SocketEventsEnum.JOIN_ROOM,
            result: "Invalid room",
          });

          throw new Error(`Socket emit error: ${SocketEventsEnum.JOIN_ROOM}, invalid room`)
        }

        socket.data.conversationId = conversation._id;

        socket.join(conversationId);
        console.log('joined room', conversation._id);

      } catch (error) {
        console.log(error);
      }
    })

    socket.on(SocketEventsEnum.MSG_SEND, async ({ content }) => {
      try {
        const messageData: IMessageSend = content;
        const chatData = {
          sender: socket.data.userId,
          conversationId: messageData.conversationId,
        }

        const conversation = await CONVERSATION.findOne({ _id: chatData.conversationId });
        if (!conversation) throw new Error("Conversation not found");

        const newMsg = new MESSAGE(messageData);
        const savedMsg = await newMsg.save();

        await CONVERSATION.findByIdAndUpdate(conversation._id, { $push: { messages: savedMsg._id } })
        const conversationSocketId = onlineUsers.get('conversationId');
        console.log('conversationSocketId', conversationSocketId);
        console.log('socket.data.userId', socket.data.userId);
        if (conversationSocketId) {
          socket.to(chatData.conversationId).emit(SocketEventsEnum.MSG_RECEIVE, savedMsg);
          console.log('emitted send message');
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

        const conversation = await CONVERSATION.findOne({ _id: chatData.conversationId });
        if (!conversation) throw new Error("Conversation not found");

        const newMsg = new MESSAGE(messageData);
        const savedMsg = await newMsg.save();

        await CONVERSATION.findByIdAndUpdate(conversation._id, { $push: { messages: savedMsg._id } })

        const conversationSocketId = onlineUsers.get('conversationId');
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
      console.log("socket.handshake.headers.authorization", socket.handshake.headers.authorization)
      if (!socket.handshake.headers.authorization) return next(new Error(ErrorEnum.authorization));

      const userData = await AuthService.verifyAccessToken(socket.handshake.headers.authorization);

      if (!userData) return next(new Error(ErrorEnum.unauthorized));

      onlineUsers.set('userId', userData._id);
      onlineUsers.set('conversationId', socket.id);
      socket.data.userId = userData._id;

      next();

    } catch (error: any) {
      console.error(error);
      return next(error instanceof Error ? error.message : error);
    }
  }
}

export default ChatSocket;