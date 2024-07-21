const ss = require('socket.io-stream');

import fs from "fs";
import path from "path";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { AuthService } from "../../services/auth";

import { ErrorEnum } from "../../interfaces/ErrorHandler";
import { IFileSend, IMessageSend } from "../../interfaces/message";
import ISocket, { SocketEventsEnum } from "../../interfaces/socket";
import CONVERSATION from "../../models/conversation";
import MESSAGE from "../../models/message";
import { cloudinaryInstance } from "../../utils/cloudinary";
import config from "../../config";
import { ReadableStream } from "node:stream/web";
import { JwtPayload } from "jsonwebtoken";

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
        const messageData: IMessageSend = data;
        const chatData = {
          sender: socket.data.userId,
          conversationId: messageData.conversationId,
        }

        const conversation = await CONVERSATION.findOne({ _id: chatData.conversationId });
        if (!conversation) throw new Error("Conversation not found");

        const newMsg = new MESSAGE(messageData);
        const savedMsg = await newMsg.save();

        const currentSocketRoom = onlineUsers.get('currentSocketRoom');

        if (currentSocketRoom) {
          socket.to(currentSocketRoom).emit(SocketEventsEnum.MSG_RECEIVE, savedMsg);
        };
      } catch (error) {
        socket.emit(SocketEventsEnum.ERROR, error instanceof Error ? error.message : error);
        console.error(error);
      }
    })

    socket.on(SocketEventsEnum.MSG_SEND_FILE, async (fileData: IFileSend) => {
      try {
        const messageData = fileData;
        const chatData = {
          sender: socket.data.userId,
          conversationId: messageData.conversationId,
        }

        const conversation = CONVERSATION.findOne({ _id: chatData.conversationId });
        if (!conversation) throw new Error("Conversation not found");

        const cloudPath = `${config.CLOUDINARY.FOLDER_NAME}/conversation_data/${chatData.conversationId}`;
        // const { isSuccess, imageURL } = await cloudinaryInstance.uploadImage(localFilePath, cloudPath);
        // if (isSuccess) {
        //   messageData.file = imageURL;
        // };

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

      const { err, result } = AuthService.verifyAccessToken(socket.handshake.headers.authorization);

      if (err) return next(new Error(ErrorEnum.unauthorized));

      socket.data.userId = (result as JwtPayload)._id;

      next();

    } catch (error: any) {
      console.error(error);
      return next(error instanceof Error ? error.message : error);
    }
  }
}

export default ChatSocket;