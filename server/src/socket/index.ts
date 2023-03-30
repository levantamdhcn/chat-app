import { Server as HttpServer } from "http";
import { Server as HttpsServer } from "https";
import { Server, Socket } from "socket.io";
import ChatSocket from "../controllers/socket";
import { SocketEventsEnum } from "../interfaces/socket";

const WEBSOCKET_CORS = {
  origin: "*",
  methods: ['GET', 'POST']
}
var onlineUsers: Map<any, any>;

class WebSocket extends Server {
  private static io: WebSocket;

  constructor(httpServer: number | HttpServer | HttpsServer) {
    super(httpServer, {
      cors: WEBSOCKET_CORS
    });
  }
  
  public static getInstance(httpServer?: number | HttpServer | HttpsServer): WebSocket {
    if (!WebSocket.io && httpServer) {
      WebSocket.io = new WebSocket(httpServer);
      console.log("Initialize Socket.io server successfully");
    }
    
    return WebSocket.io;
  }
  
  public initializeHandlers(socketHandlers: any[]) {
    console.log("Start inialize.....");
    console.log("socketHandlers", socketHandlers);
    socketHandlers.forEach((element: { path: string, handler: ChatSocket }) => {
      console.log("socket from of handler", element.path);
      const namespace = WebSocket.io.of(element.path).on(SocketEventsEnum.CONNECTION, (socket: Socket) => {
        element.handler.handleConnection(socket);
      });
      
      if (element.handler.middlewareImplementation) {
          namespace.use(element.handler.middlewareImplementation);
        }
      });
    }
  }
  
  export default WebSocket;
  