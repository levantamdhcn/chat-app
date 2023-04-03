import { NextFunction, Request, Response, Router } from "express";
import user from "../../controllers/user";
import IUserService from "../../services/user";
import { authMiddleware } from "../../middlewares/auth";

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
    this.rout.get("/", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await this.controller.get();

        res.status(200).json(result);
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error when get users"});
      }
    });

    this.rout.get("/currentUser", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
      try {
        res.status(200).json(req.user);
      } catch (error) {
        res.status(404).json({ message: error instanceof Error ? error.message : error });
      }
    })

    this.rout.get("/:userId", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await this.controller.getOne(req.params.userId);

        res.status(200).json(result);
      } catch (error) {
        res.status(404).json({ message: error instanceof Error ? error.message : error });
      }
    });

    this.rout.put("/:userId", authMiddleware,async (req: Request, res: Response, next: NextFunction) => {
      try {
        let localFilePath = req.file?.path || "";
        const result = await this.controller.update(req.body, req.params.userId, localFilePath);

        res.status(200).json(result);
      } catch (error) {
        res.status(404).json({ message: error instanceof Error ? error.message : error });
      }
    });

    this.rout.delete("/:userId", authMiddleware,async (req: Request, res: Response, next: NextFunction) => {
      try {
        await this.controller.delete(req.params.userId);

        res.status(200).json({ message: "Delete successfully."});
      } catch (error) {
        res.status(404).json({ message: error instanceof Error ? error.message : error });
      }
    })
    
    this.rout.get("/search/:searchValue", authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
      const searchValue = req.params.searchValue;
      const result = await this.controller.search(searchValue);

      res.status(200).json(result);
    })
  };
};

export = new User().router;