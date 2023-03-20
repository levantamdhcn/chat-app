
import { Socket } from "socket.io";

interface ISocket {
  handleConnection(socket: Socket): void;
  middlewareImplementation?(socket: Socket, next: any): void
}

export enum SocketEventsEnum {
  CONNECTION = 'connection',
  DISCONNECT = 'disconnect',
  MSG_SEND = 'msg_send',
  MSG_SEND_FILE = 'msg_send:file',
  MSG_RECEIVE = 'msg_receive',
  ERROR = 'error'
}

export default ISocket;