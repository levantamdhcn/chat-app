import { NextFunction, Request, Response, Router } from "express";
import user from "../../controllers/user";
import IUserService from "../../services/user";

class User {
  private rout = Router();
  private controller: IUserService = user;

  get router() {
    return this.rout;
  }

  constructor() {
    this.init();
  }

  private init() {
    this.rout.get("/", async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await this.controller.get();

        res.status(200).json(result);
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error when get users"});
      }
    })
  };
};

export = new User().router;