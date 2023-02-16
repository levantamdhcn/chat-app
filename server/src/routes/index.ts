import { Router } from "express";
import auth from "./auth";
import user from "./user";

class MasterRouter {
  private rout = Router();
  private userRoute = user;
  private authRoute = auth

  get router() {
    return this.rout;
  }

  constructor() {
    this.init();
  }

  private init() {
    this.rout.use("/user", this.userRoute);
    this.rout.use("/auth", this.authRoute);
  };
}

export = new MasterRouter().router;