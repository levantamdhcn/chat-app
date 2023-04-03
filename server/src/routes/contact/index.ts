import { Request, Response, Router } from "express";
import { CreatedUser } from "../../interfaces/user";
import { authMiddleware } from "../../middlewares";
import controller from "../../controllers/contact";

class Contact {
  public route = Router();
  public controller = controller;
  constructor() {
    this.init();
  }

  init() {
    this.route.get('/', authMiddleware, async (req: Request, res: Response) => {
      try {
        const result = await this.controller.get();

        res.status(200).json(result);
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: `Error ${error instanceof Error ? error.message : error}` })
      }
    })

    this.route.get('/user/:userId', authMiddleware, async (req: Request, res: Response) => {
      try {
        const userId = req.params.userId;
        const result = await this.controller.getContactByUser(userId);

        res.status(200).json(result);
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: `Error ${error instanceof Error ? error.message : error}` })
      }
    })

    this.route.post('/', authMiddleware, async (req: Request, res: Response) => {
      try {
        const user = req.user;
        const data = req.body.user;

        const result = await this.controller.create(data, user as CreatedUser);
        res.status(200).json(result);
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: `Error ${error instanceof Error ? error.message : error}` })
      }
    })

    this.route.get('/:contactId', authMiddleware, async (req: Request, res: Response) => {
      try {
        const contactId = req.params.contactId;

        const result = await this.controller.getContactById(contactId);
        res.status(200).json(result);
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: `Error ${error instanceof Error ? error.message : error}` })
      }
    })

    this.route.delete('/:contactId', authMiddleware, async (req: Request, res: Response) => {
      try {
        const contactId = req.params.contactId;

        const result = await this.controller.deleteContact(contactId);
        res.status(200).json(result);
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: `Error ${error instanceof Error ? error.message : error}` })
      }
    })
  }
}

export = new Contact().route;