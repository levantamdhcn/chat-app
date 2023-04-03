import { Router } from "express";
import auth from "./auth";
import user from "./user";
import conversation from "./conversation";
import message from "./message";
import contact from "./contact";

class MasterRouter {
  private rout = Router();
  private userRoute = user;
  private authRoute = auth
  private conversationRoute = conversation;
  private messageRoute = message;
  private contactRoute = contact;

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
    this.rout.use("/contact", this.contactRoute);
  };
}

export = new MasterRouter().router;