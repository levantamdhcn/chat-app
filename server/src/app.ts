import express, { Express, Request, Response, NextFunction } from 'express';
import * as dotenv from "dotenv";
import http from "http";
import bodyParser from 'body-parser';
import Cors from 'cors';
import morgan from 'morgan';
import { Server } from "socket.io";

import "./passportHanlders";
import Websocket from "./socket";
import MasterRouter from "./routes";
import ErrorHandler from './interfaces/ErrorHandler';
import config from './config';
import db from "./db";
import { ChatSocket } from './controllers/socket';

class ServerModule {
  public host;
  public port;
  public http: http.Server | undefined;
  public app: Express | undefined;
  public io: Websocket | undefined;
  public router: any;

  constructor() {
    this.host = config.env.APP_HOST;
    this.port = config.env.APP_PORT;
    this.router = MasterRouter;
    this.databaseInitialize();
    this.start();
  }

  public start() {
    this.app = express();
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(Cors());
    this.app.use(morgan('combined'));
    this.app.use(express.static("public"));
    this.app.use("/api", this.router);
    this.app.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      next();
    });
    this.app.use(
      (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
        res.status(err.statusCode || 500).json({
          status: 'error',
          statusCode: err.statusCode,
          message: err.message,
        });
      },
    );

    this.http = http.createServer(this.app);
    this.io = Websocket.getInstance(this.http);

    this.io.initializeHandlers([
      { path: '/chat', handler: new ChatSocket() }
    ])

    console.log("onlineUsers", (global as any).onlineUsers);

    this.http.listen(
      this.port,
      () => console.log(`Server running on http://${this.host}:${this.port}`)
    )
  }

  public databaseInitialize() {
    db().
      then((info: any) => {
        console.log(`Connected ${info.name} database`);
      })
      .catch((err) => {
        console.error(`Error ${err.message}`);
        process.exit(1);
      });
  }
};

export const app: ServerModule = new ServerModule();
