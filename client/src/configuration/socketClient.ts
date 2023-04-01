import { io, Socket } from 'socket.io-client'

const REACT_APP_WEB_SOCKET_HOST = process.env.REACT_APP_WEB_SOCKET_HOST || "";

export default class SocketClient {
  socket: Socket | null | undefined;

  connect() {
    const token = localStorage.getItem("accessToken");
    console.log('token', token);

    this.socket = io(REACT_APP_WEB_SOCKET_HOST, {
      extraHeaders: {
        authorization: token ? token : "",
      }
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }


  //TODO: Correct type of data
  emit(eventName: string, data: any) {
    if (this.socket) {
      this.socket.emit(eventName, data);
    }
  }

  on(eventName: string, func: (params: any) => void) {
    if (this.socket) {
      this.socket.on(eventName, func);
    }
  }

  to() {
    
  }
}