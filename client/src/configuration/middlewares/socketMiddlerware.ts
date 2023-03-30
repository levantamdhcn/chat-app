import { Dispatch } from "@reduxjs/toolkit"
import { addMessage, removeTypingUser, setOnlineUsersByUsername, setTypingUser } from "../../store/reducers/socket"
import { SOCKET_EVENTS } from "../../types/constane"
import { IMessage } from "../../types/message"
import SocketClient from "../socketClient"

//TODO: Correct type of getState key
interface SocketMiddlewareParams {
  dispatch: Dispatch
  getState: any
}

export default function socketMiddlerware(socket: SocketClient) {
  return (params: SocketMiddlewareParams) => (next: any) => (action: any) => {
    const { dispatch } = params;
    const { type, payload } = action;

    switch (type) {
      //Connect to the socket when a user login
      case 'auth/login':
        socket.connect();

        // Set up all the socket event handlers
        // When these events are received from the socket, they'll dispatch the proper Redux action

        // Update the online users list every time a user logs in or out
        socket.on(SOCKET_EVENTS.USERS_ONLINE, (onlineUsers: string[]) => {
          dispatch(setOnlineUsersByUsername(onlineUsers));
        });

        // Append a message every time a new one comes in
        socket.on(SOCKET_EVENTS.MSG_RECEIVE, (message: IMessage) => {
          dispatch(addMessage(message))
        })

        // Remove if some user stops typing
        socket.on(SOCKET_EVENTS.STOP_TYPING, (_id: string) => {
          dispatch(removeTypingUser(_id));
        })

        // Add if some user starts typing
        socket.on(SOCKET_EVENTS.START_TYPING, (username: string) => {
          dispatch(setTypingUser(username));
        })

        // Add the current user to the online users list
        socket.emit(SOCKET_EVENTS.NEW_LOGIN, payload)
        break;
      // Telling the sever that this user is typing...
      case 'socket/sendThisUserIsTyping': {
        socket.emit(SOCKET_EVENTS.TYPING, payload)
        break;
      }
      // Telling the server that this user stopped typing..
      case 'socket/sendThisUserStoppedTyping': {
        socket.emit(SOCKET_EVENTS.STOP_TYPING, payload)

        break;
      }
      // Disconnect from the socket when a user logs out
      case 'auth/logout': {
        socket.disconnect()

        break;
      }
      // Let the server be the source of truth for all messages; don't dispatch anything
      case 'conversation/sendMessage': {
        socket.emit(SOCKET_EVENTS.MSG_SEND, payload)

        return
      }
    }

    return next(action);
  }
}