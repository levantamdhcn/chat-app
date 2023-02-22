import { NextFunction, Request, Response, Router } from "express";
import controller from "../../controllers/message";
import { authMiddleware } from "../../middlewares/auth";

class Message {
  private rout = Router();
  private controller = controller;

  get router() {
    return this.rout;
  };

  constructor() {
    this.init();
  }

  init() {
    this.rout.post("/", authMiddleware,async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = req.body;
        const result = await this.controller.create(data);

        res.status(200).json(result);
      } catch (error) {
        res.status(500).json(error);
      }
    })

    this.rout.get("/:conversationId", authMiddleware,async (req: Request, res: Response, next: NextFunction) => {
      try {
        const conversationId = req.params.conversationId;
        if(!conversationId) {
          res.status(404).json({ message: "User is required."});
        };

        const result = await this.controller.getMessageByConversation(conversationId);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json(error);
      }
    })
  }
}

export = new Message().router;