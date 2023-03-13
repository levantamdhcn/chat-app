import { NextFunction, Request, Response, Router } from "express";
import authController from "../../controllers/auth";
import { multerUpload } from "../../utils/multer";
import { cloudinaryInstance } from "../../utils/cloudinary";
import User from "../../models/user";
import { authMiddleware } from "../../middlewares";

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
        let data = req.body;
        const u = await User.findOne({ email: data.email });
        if (u) {
          throw new Error("User with this email is exist!");
        };
        const localFilePath = req.file?.path || "";
        
        const result = await this.controller.registration(data, localFilePath);
        
        res.status(200).json(result);
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: error instanceof Error ? error.message : "Server Error" });
      }
    })

    this.rout.get("/confirm/:confirmationCode", async (req: Request, res: Response, next: NextFunction) => {
      try {
        let confirmationCode = req.params.confirmationCode;
        let u = this.controller.verifyUser(confirmationCode);
        res.status(200).json({ message: "Verified user", user: u });
      } catch (error) {
        res.status(404).json({ message: "Verify failed." });
      }
    })
  };
};

export default new Auth().router;