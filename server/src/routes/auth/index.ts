import { NextFunction, Request, Response, Router } from "express";
import authController from "../../controllers/auth";
import { multerUpload } from "../../utils/multer";
import { cloudinaryInstance } from "../../utils/cloudinary";

class Auth {
  private rout = Router();
  private controller = authController;

  get router() {
    return this.rout;
  }

  constructor() {
    this.init();
  }

  private init() {
    this.rout.post("/login", async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, password } = req.body;
        if (!email || !password) {
          res.status(404).json({ message: "Missing required field" });
        };
        const result = await this.controller.login(email, password);

        res.status(200).json(result);
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: error instanceof Error ? error.message : "Server Error" });
      }
    });

    this.rout.post("/registration", multerUpload.single('avatar'), async (req: Request, res: Response, next: NextFunction) => {
      try {
        const localFilePath = req.file?.path || "";
        let data = req.body;
        const { isSuccess, message, imageURL } = await cloudinaryInstance.uploadImage(localFilePath);
        console.log("messgae", message);
        if (isSuccess) {
          data.avatar = imageURL;
        };

        const result = await this.controller.registration(data);

        res.status(200).json(result);
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: error instanceof Error ? error.message : "Server Error" });
      }
    })
  };
};

export default new Auth().router;