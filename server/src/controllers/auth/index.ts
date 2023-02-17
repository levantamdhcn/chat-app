import { IUser, status } from "../../interfaces/user";
import { Post, Body, Inject, Get } from "tsoa";
import USER from "../../models/user";
import jwt from "jsonwebtoken";
import config from "../../config";
import { sendConfirmationEmail } from "../../utils/nodemailer";
import { cloudinaryInstance } from "../../utils/cloudinary";

class AuthController {
    constructor() {

    };

    @Post("/registration")
    public async registration(@Body() user: IUser, @Inject() localFilePath: string) {
      try {
        const token = jwt.sign({email: user.email}, config.env.SECRET_KEY);
        const newUser = new USER({
          ...user,
          email: user.email.toLowerCase(),
          confirmationCode: token,
        });

        const cloudPath = `${config.CLOUDINARY.FOLDER_NAME}/${newUser.email}`;
        const { isSuccess, imageURL } = await cloudinaryInstance.uploadImage(localFilePath, cloudPath);
        if (isSuccess) {
          newUser.avatar = imageURL;
        };
        
        let createdUser = await newUser.save();

        await sendConfirmationEmail(`${newUser.firstName} ${newUser.lastName}`, newUser.email, newUser.confirmationCode);

        return {
          token: createdUser.generateJWT(),
          user: createdUser,
        };
      } catch (error) {
        console.log(error);
      };
    };

    @Post("/login")
    public async login(@Body() email: string, password: string) {
      try {
        if(!email) {
          throw new Error("Email is required");
        };

        const u = await USER.findOne({ email });
        if(!u) throw new Error(`User with email ${email} is not exist`);

        if(!u.validPassword(password)) {
          throw new Error("Invalid password!");
        };

        if (u.status != status.active) {
         throw new Error("Pending Account. Please Verify Your Email!");
        }

        return {
          token: u.generateJWT(),
          user: u
        }
      } catch (error) {
        console.log(error);
      }
    };

    @Get("/confirm/:confirmationCode")
    public async verifyUser(@Inject() confirmationCode: string) {
      let u = await USER.findOne({
        confirmationCode: confirmationCode,
      });

      if(!u) {
        throw new Error("User Not found.");
      };

      u.status = status.active;
      await u.save();

      return u;
    }
};

export default new AuthController();