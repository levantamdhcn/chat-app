import { IUser, status } from "../../interfaces/user";
import { Post, Body, Inject, Get, Route, Path } from "tsoa";
import USER from "../../models/user";
import jwt from "jsonwebtoken";
import config from "../../config";
import { sendConfirmationEmail } from "../../utils/nodemailer";
import { cloudinaryInstance } from "../../utils/cloudinary";
import { AuthService } from "../../services/auth";

@Route('auth')
class AuthController {
  constructor() {

  };

  @Post("/registration")
  public async registration(@Body() user: IUser, @Inject() localFilePath: string): Promise<{
    accessToken: string,
    refreshToken: string,
    user: IUser,
  } | undefined> {
    try {
      const token = jwt.sign({ email: user.email }, config.env.SECRET_KEY);
      const newUser = new USER({
        ...user,
        email: user.email.toLowerCase(),
        confirmationCode: token,
      });

      const cloudPath = `${config.CLOUDINARY.FOLDER_NAME}/avatar/${newUser._id}`;
      const { isSuccess, imageURL } = await cloudinaryInstance.uploadImage(localFilePath, cloudPath);
      if (isSuccess) {
        newUser.avatar = imageURL;
      };

      let createdUser = await newUser.save();

      await sendConfirmationEmail(`${newUser.firstName} ${newUser.lastName}`, newUser.email, newUser.confirmationCode);
      const tokens = AuthService.generateTokens({ _id: createdUser._id });
      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: createdUser,
      };
    } catch (error) {
      console.log(error);
    };
  };

  @Post("/login")
  public async login(@Body() data: { email: string, password: string }): Promise<{
    accessToken: string,
    refreshToken: string,
    user: IUser
  } | undefined> {
    try {
      const { email, password } = data;
      if (!email) {
        throw new Error("Email is required");
      };

      const u = await USER.findOne({ email });
      if (!u) throw new Error(`User with email ${email} is not exist`);

      const validPassword = await u.validPassword(password);

      if (!validPassword) {
        throw new Error("Invalid password!");
      };

      if (u.status != status.active) {
        throw new Error("Pending Account. Please Verify Your Email!");
      }

      const tokens = AuthService.generateTokens(u);
      console.log("tokens", tokens);

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: u
      }
    } catch (error) {
      console.log(error);
    }
  };

  @Post("/refreshToken/{refreshToken}")
  public async refresh(@Path() refreshToken: string) {
    try {
      const userData = await AuthService.verifyRefreshToken(refreshToken);
      if (!userData || !userData._id) throw new Error("RefreshToken is invalid");

      const tokens = AuthService.generateTokens(userData);
      return tokens;
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  @Get("/confirm/:confirmationCode")
  public async verifyUser(@Path() confirmationCode: string): Promise<IUser | null> {
    let u = await USER.findOne({
      confirmationCode: confirmationCode,
    });

    if (!u) {
      throw new Error("User Not found.");
    };

    let updatedU = await USER.findByIdAndUpdate(u._id, {
      status: status.active,
    }, { new: true });

    return updatedU;
  }
};

export default new AuthController();