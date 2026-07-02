import { NextFunction, Request, Response, Router } from "express";
import controller from "../../controllers/conversation";
import { authMiddleware } from "../../middlewares/auth";

class Conversation {
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

    this.rout.get("/:userId", authMiddleware,async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = req.params.userId;
        if(!userId) {
          res.status(404).json({ message: "User is required."});
        };

        const result = await this.controller.getConversationByUser(userId);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json(error);
      }
    })

    this.rout.post("/:conversationId", authMiddleware,async (req: Request, res: Response, next: NextFunction) => {
      try {
        const conversationId = req.params.conversationId;
        const members = req.body;
        if(!conversationId) {
          res.status(404).json({ message: "Conversation is required."});
        };

        const result = await this.controller.pushMember(members, conversationId);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json(error);
      }
    })
  }
}

export = new Conversation().router;