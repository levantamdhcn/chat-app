import { Router } from "express";
import auth from "./auth";
import user from "./user";
import conversation from "./conversation";
import message from "./message";

class MasterRouter {
  private rout = Router();
  private userRoute = user;
  private authRoute = auth
  private conversationRoute = conversation;
  private messageRoute = message;

  get router() {
    return this.rout;
  }

  constructor() {
    this.init();
  }

  private init() {
    this.rout.use("/user", this.userRoute);
    this.rout.use("/auth", this.authRoute);
    this.rout.use("/conversation", this.conversationRoute);
    this.rout.use("/message", this.messageRoute);
  };
}

export = new MasterRouter().router;