import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";
import http from "http";
import swaggerUi from "swagger-ui-express";
import config from "./config";
import db from "./db";
import ErrorHandler from './interfaces/ErrorHandler';
import MasterRouter from "./routes/index";
import swaggerDocs from "./swagger";

class Server {
  public app = express();
  public router = MasterRouter;
};

const server = new Server();

server.app.use(express.json({ limit: '50mb' }));
server.app.use(express.urlencoded({ extended: false, limit: '50mb' }));
server.app.use(cors());
server.app.use("/api", server.router);

if(config.env.APP_PORT) {
  swaggerDocs(server.app, config.env.APP_PORT);
};

const httpServer = http.createServer(server.app);

server.app.use(express.static("public"));

db()
  .then((info: any) => {
    console.log(`Connected ${info.name} database`);
    console.log(`Server running on port: ${config.env.APP_PORT || 3115}`);
    httpServer.listen(config.env.APP_PORT || 300);
  })
  .catch((err) => {
    console.error(`Error ${err.message}`);
    process.exit(1);
  });

server.app.use(
  (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message,
    });
  },
);
